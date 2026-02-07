import { Direction } from '../../global-config';
import { Platform } from './platform';
import { TextureKey } from '../../texture-keys';

export class PlatformVertical extends Platform {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, TextureKey.PlatformV);

    this.direction = Direction.Down;
    this.body.velocity.y = this.velocity;
  }
}
