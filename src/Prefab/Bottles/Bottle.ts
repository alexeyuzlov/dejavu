import type { AbstractZone } from "../../State/Levels/AbstractZone";
import { ArcadePrefab } from "../ArcadePrefab";
import type { Player } from "../Player";
import type { TextureKeyValue } from "../../TextureKeys";

export abstract class Bottle extends ArcadePrefab {
    level: AbstractZone;

    constructor(game: Phaser.Game, x: number, y: number, texture: TextureKeyValue) {
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
