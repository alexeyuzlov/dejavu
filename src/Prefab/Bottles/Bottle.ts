import type { AbstractZone } from "../../State/Levels/AbstractZone";
import { ArcadePrefab } from "../ArcadePrefab";
import type { Player } from "../Player";

export abstract class Bottle extends ArcadePrefab {
    level: AbstractZone;

    constructor(game: Phaser.Game, x: number, y: number, texture) {
        super(game, x, y, texture);
        game.physics.arcade.enable(this);
    }

    abstract makeAction(): void;

    update() {
        this.game.physics.arcade.overlap(
            this.level.player,
            this,
            (_player: Player, bottle: Bottle) => {
                bottle.makeAction();
                bottle.kill();
            }
        );
    }
}
