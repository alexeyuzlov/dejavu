import type { AbstractZone } from "../../State/Levels/AbstractZone";
import { AbstractPrefab } from "../AbstractPrefab";

export class Bottle extends AbstractPrefab {
    level: AbstractZone;

    constructor(game: Phaser.Game, x: number, y: number, texture) {
        super(game, x, y, texture);
        game.physics.arcade.enable(this);
    }

    update() {
        this.game.physics.arcade.overlap(this.level.player, this, (player, bottle) => {
            bottle.makeAction();
            bottle.kill();
        });
    }
}
