import { Direction } from '../../GlobalConfig';
import { Platform } from './Platform';

export class PlatformHorizontal extends Platform {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'platform-h');

    game.physics.arcade.enable(this);
    this.body.immovable = true;

    this.direction = Direction.Right;
    this.body.velocity.x = this.velocity;
  }
}
