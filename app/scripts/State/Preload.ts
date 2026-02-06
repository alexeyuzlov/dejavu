module Sample.State {
    export class Preload extends Phaser.State {
        preload() {
            var preloadBar = new Prefab.PreloadBar(
                this.game,
                this.game.world.width - 10,
                this.game.world.height - 10
            );
            this.load.setPreloadSprite(preloadBar);

            this.load.atlasXML(
                "player",
                "assets/images/prefabs/player/player.png",
                "assets/images/prefabs/player/player.xml"
            );

            //this.load.image('tween', 'assets/images/prefabs/tween.png');
            this.load.image("tween", "assets/images/prefabs/transparent.png");
            //this.load.image('transparent', 'assets/images/prefabs/transparent-debug.png');
            this.load.image("transparent", "assets/images/prefabs/transparent.png");

            this.load.image("hud", "assets/images/prefabs/hud.png");
            this.load.image("ground", "assets/images/ground.png");

            this.load.image("platform-h", "assets/images/prefabs/platform-h.png");
            this.load.image("platform-v", "assets/images/prefabs/platform-v.png");

            this.load.image("bottle-hp", "assets/images/prefabs/bottles/bottle-hp.png");
            this.load.image("bottle-super", "assets/images/prefabs/bottles/bottle-super.png");

            this.load.image("exit", "assets/images/prefabs/exit.png");
            this.load.image("spike", "assets/images/prefabs/spike.png");
            this.load.image("ice-spike", "assets/images/prefabs/ice-spike.png");

            this.load.atlasXML(
                "runner",
                "assets/images/prefabs/enemies/runner.png",
                "assets/images/prefabs/enemies/runner.xml"
            );

            this.load.atlasXML(
                "flier",
                "assets/images/prefabs/enemies/flier.png",
                "assets/images/prefabs/enemies/flier.xml"
            );
            this.load.atlasXML(
                "flier-crash",
                "assets/images/prefabs/enemies/flier-crash.png",
                "assets/images/prefabs/enemies/flier-crash.xml"
            );

            this.load.atlasXML(
                "shooter",
                "assets/images/prefabs/enemies/shooter.png",
                "assets/images/prefabs/enemies/shooter.xml"
            );
            this.load.atlasXML(
                "shooter-reject",
                "assets/images/prefabs/enemies/shooter-reject.png",
                "assets/images/prefabs/enemies/shooter-reject.xml"
            );

            this.load.atlasXML(
                "boss",
                "assets/images/prefabs/enemies/boss.png",
                "assets/images/prefabs/enemies/boss.xml"
            );

            this.load.atlasXML(
                "egg",
                "assets/images/prefabs/bullets/egg.png",
                "assets/images/prefabs/bullets/egg.xml"
            );
            this.load.image("bullet", "assets/images/prefabs/bullets/bullet.png");
            this.load.image("bullet-reject", "assets/images/prefabs/bullets/bullet-reject.png");
        }

        create() {
            this.game.state.start(settings.storage.getCurrentState());
        }
    }
}
