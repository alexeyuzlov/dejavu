import { Direction } from "../../GlobalConfig";
import { ArcadePrefab } from "../ArcadePrefab";
import type { Player } from "../Player";
import type { Transparent } from "../Transparent";
import type { TextureKeyValue } from "../../TextureKeys";

export abstract class Platform extends ArcadePrefab {
    direction: Direction;
    velocity = 100;

    constructor(game: Phaser.Game, x: number, y: number, texture: TextureKeyValue) {
        super(game, x, y, texture);

        game.physics.arcade.enable(this);
        this.body.immovable = true;
    }

    toggleDirection() {
        switch (this.direction) {
            case Direction.Up:
                this.direction = Direction.Down;
                this.body.velocity.y = this.velocity;
                break;
            case Direction.Down:
                this.direction = Direction.Up;
                this.body.velocity.y = -this.velocity;
                break;
            case Direction.Left:
                this.direction = Direction.Right;
                this.body.velocity.x = this.velocity;
                break;
            case Direction.Right:
                this.direction = Direction.Left;
                this.body.velocity.x = -this.velocity;
                break;
            default:
                // Don't doing something
                break;
        }
    }

    update() {
        this.game.physics.arcade.collide(
            this.level.player,
            this,
            null,
            (player: Player, platform: Platform) => {
                return player.y - platform.body.height <= platform.y;
            }
        );

        this.game.physics.arcade.collide(
            this,
            this.level.transparents,
            (platform: Platform, _transparent: Transparent) => {
                platform.toggleDirection();
            }
        );
    }
}
