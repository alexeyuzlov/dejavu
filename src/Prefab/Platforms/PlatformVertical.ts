import { Direction } from "../../GlobalConfig";
import { Platform } from "./Platform";
import { TextureKey } from "../../TextureKeys";

export class PlatformVertical extends Platform {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, TextureKey.PlatformV);

        game.physics.arcade.enable(this);
        this.body.immovable = true;

        this.direction = Direction.Down;
        this.body.velocity.y = this.velocity;
    }
}
