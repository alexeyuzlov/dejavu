import { Direction } from '../../global-config';
import { Platform } from './platform';
import { TextureKey } from '../../texture-keys';

export class PlatformHorizontal extends Platform {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, TextureKey.PlatformH);

    this.direction = Direction.Right;
    this.body.velocity.x = this.velocity;
  }
}
