import type { AbstractZone } from "../State/Levels/AbstractZone";

export class AbstractPrefab extends Phaser.Sprite {
    level: AbstractZone;

    constructor(game: Phaser.Game, x: number, y: number, texture) {
        super(game, x, y, texture);

        this.level = this.game.state.states[this.game.state.current];

        game.add.existing(this);
    }
}
