import type { AbstractZone } from "../../State/Levels/AbstractZone";
import { ArcadePrefab } from "../ArcadePrefab";

export class Bottle extends ArcadePrefab {
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
