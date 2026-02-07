import type { AbstractZone } from "../State/Levels/AbstractZone";
import type { TextureKeyValue } from "../TextureKeys";

export class AbstractPrefab extends Phaser.Sprite {
    level: AbstractZone;

    constructor(
        game: Phaser.Game,
        x: number,
        y: number,
        texture: TextureKeyValue | Phaser.BitmapData
    ) {
        super(game, x, y, texture);

        this.level = this.game.state.states[this.game.state.current];

        game.add.existing(this);
    }
}
