import { TextureKey } from "../TextureKeys";
import { AbstractPrefab } from "./AbstractPrefab";

export class PreloadBar extends AbstractPrefab {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, TextureKey.PreloadBar);

        this.anchor.setTo(1, 1);
    }
}
