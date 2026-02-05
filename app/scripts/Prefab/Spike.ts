module Sample.Prefab {

    export class Spike extends AbstractPrefab {
        damagePoints: number = 10;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'spike');

            game.physics.arcade.enable(this);

            this.body.immovable = true;
        }

        update() {
            this.game.physics.arcade.collide(this.level.player, this, (player, spike) => {
                if (!this.level.player.immortalState) {
                    this.level.player.makeDamage(spike.damagePoints);
                    this.level.hud.updateHealthState();
                }
            });
        }
    }
}