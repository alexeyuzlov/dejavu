module Sample.Prefab {
    export class Egg extends AbstractPrefab {
        speed:number = 180;
        damagePoints:number = 35;
        eggCrashState:boolean;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'egg');

            game.physics.arcade.enable(this);
            this.anchor.set(0.5, 0.5);
            this.kill();

            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;

            this.eggCrashState = false;

            this.animations.add('egg', ['egg.png'], 10, true);
            this.animations.add('egg-crash', ['egg-crash.png'], 10, true);

            this.animations.play('egg');
        }

        setEggCrash() {
            this.eggCrashState = true;
            this.animations.play('egg-crash');

            this.body.width = this.animations.currentFrame.width;
            this.body.height = this.animations.currentFrame.height;
        }

        update() {
            this.game.physics.arcade.collide(this, this.level.player, (egg, player)=> {
                egg.kill();

                if (!this.level.player.immortalState && !this.level.player.attackState) {
                    this.level.player.makeDamage(egg.damagePoints);
                    this.level.hud.updateHealthState();
                }
            });

            this.game.physics.arcade.collide(this, this.level.layer, (egg, layer)=> {
                if (!this.eggCrashState) {
                    egg.setEggCrash();
                }
            });
        }
    }
}