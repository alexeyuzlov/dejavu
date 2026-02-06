module Sample.State {

    export class AbstractZone extends Phaser.State {
        map:Phaser.Tilemap;
        layer:Phaser.TilemapLayer;

        player:Prefab.Player;
        hud:Prefab.HUD;
        blackScreen:Prefab.BlackScreen;

        transparents:Phaser.Group;
        spikes:Phaser.Group;
        iceSpikes:Phaser.Group;
        exits:Phaser.Group;

        platformsHorizontal:Phaser.Group;
        platformsVertical:Phaser.Group;

        shooters:Phaser.Group;
        shootersReject:Phaser.Group;
        runners:Phaser.Group;
        fliers:Phaser.Group;
        fliersCrash:Phaser.Group;

        bottlesHP:Phaser.Group;
        bottlesSuper:Phaser.Group;

        game:Game;

        preload() {
            // All in preload file
            // Don't delete this function
        }

        create() {
            settings.storage.setCurrentState(this.game.state.current);
            this.game.stage.backgroundColor = "#000000";

            // MAP AND LAYERS
            this.map = this.game.add.tilemap('map');
            this.map.addTilesetImage('ground');
            this.map.setCollisionBetween(1, 5);

            this.layer = this.map.createLayer('layer');
            this.layer.resizeWorld();

            // PREFABS SINGLE
            this.player = new Prefab.Player(this.game, 120, this.game.world.height - 200);

            this.hud = new Prefab.HUD(this.game, 10, 10);
            this.hud.alpha = 0;

            // PREFABS MULTIPLE
            this.transparents = this.getPrefabsFromMap('transparent', Prefab.Transparent);
            this.exits = this.getPrefabsFromMap('exit', Prefab.Exit);
            this.spikes = this.getPrefabsFromMap('spike', Prefab.Spike);
            this.iceSpikes = this.getPrefabsFromMap('ice-spike', Prefab.IceSpike);
            this.bottlesHP = this.getPrefabsFromMap('bottle-hp', Prefab.BottleHP);
            this.bottlesSuper = this.getPrefabsFromMap('bottle-super', Prefab.BottleSuper);
            this.shooters = this.getPrefabsFromMap('shooter', Prefab.Shooter);
            this.shootersReject = this.getPrefabsFromMap('shooter-reject', Prefab.ShooterReject);
            this.runners = this.getPrefabsFromMap('runner', Prefab.Runner);
            this.fliers = this.getPrefabsFromMap('flier', Prefab.Flier);
            this.fliersCrash = this.getPrefabsFromMap('flier-crash', Prefab.FlierCrash);
            this.platformsHorizontal = this.getPrefabsFromMap('platform-h', Prefab.PlatformHorizontal);
            this.platformsVertical = this.getPrefabsFromMap('platform-v', Prefab.PlatformVertical);

            // POST-SETTINGS
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);

            this.blackScreen = new Prefab.BlackScreen(this.game);
            this.blackScreen.setText(this.game.state.current);
            this.game.add.tween(this.blackScreen)
                .to({ alpha: 0 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true)
                .onComplete.add(()=> {
                    this.hud.alpha = 1;
                });

            this.game.input.keyboard.addKey(Phaser.Keyboard.P).onDown.add(() => {
                this.game.paused = !this.game.paused;
            });
        }

        getPrefabsFromMap(name:string, className?:object):Phaser.Group {
            var group = this.game.add.group();

            var index = this.map.getTilesetIndex(name);

            if (className && index) {
                this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, name, 0, true, false, group, className);
            } else if (index) {
                this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, name, 0, true, false, group);
            }

            return group;
        }

        render() {
            //this.game.debug.spriteInfo(this.player, 100, 100);
        }

        update() {
            /*
            DEBUG FEATURE

             if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                 this.blackScreen.setText("");
                 this.game.add.tween(this.blackScreen)
                    .to({ alpha: 1 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true)
                    .onComplete.add(()=> {
                        this.startNextLevel();
                    });
             }

            */

        }

        gameOver() {
            this.blackScreen.setText("Game Over. Reload Level.");
            this.game.add.tween(this.blackScreen)
                .to({ alpha: 1 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true)
                .onComplete.add(()=> {
                    this.game.state.start(this.game.state.current);
                });
        }

        startNextLevel() {
            settings.storage.setHealthPoints(this.player.health.toString());
            this.game.state.start(this.getNextLevel());
        }

        getNextLevel() {
            switch (this.game.state.current) {
                case Levels[Levels.Zone1Level1]:
                    //return Levels[Levels.Zone2Level1];
                    return Stories[Stories.Story2];
                case Levels[Levels.Zone2Level1]:
                    //return Levels[Levels.Zone3Level1];
                    return Stories[Stories.Story3];
                case Levels[Levels.Zone3Level1]:
                    //return Levels[Levels.Zone4Level1];
                    return Stories[Stories.Story4];
                case Levels[Levels.Zone4Level1]:
                    return 'gameOver';
            }
        }
    }
}