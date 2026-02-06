module Sample.Prefab {
    export class Transparent extends AbstractPrefab {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, "transparent");

            game.physics.arcade.enable(this);
            //this.body.immovable = true;
            this.body.moves = false;
        }
    }
}
