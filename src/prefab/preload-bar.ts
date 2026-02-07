import { TextureKey } from "../texture-keys";
import { AbstractPrefab } from "./abstract-prefab";

export class PreloadBar extends AbstractPrefab {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, TextureKey.PreloadBar);

        this.anchor.setTo(1, 1);
    }
}
