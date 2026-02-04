module Sample.Prefab {

    export class Bottle extends AbstractPrefab {
        level: State.AbstractZone;

        constructor(game:Phaser.Game, x:number, y:number, texture:string) {
            super(game, x, y, texture);
            game.physics.arcade.enable(this);
        }

        update() {
            this.game.physics.arcade.overlap(this.level.player, this, (player:any, bottle:any) => {
                bottle.makeAction();
                bottle.kill();
            });
        }
    }
}