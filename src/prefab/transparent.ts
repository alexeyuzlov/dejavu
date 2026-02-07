import { TextureKey } from "../TextureKeys";
import { ArcadePrefab } from "./ArcadePrefab";

export class Transparent extends ArcadePrefab {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, TextureKey.Transparent);

        game.physics.arcade.enable(this);
        //this.body.immovable = true;
        this.body.moves = false;
    }
}
