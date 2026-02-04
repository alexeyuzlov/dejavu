import { applyBodyConfig, enableArcade } from '../../physics';
import { Direction } from '../../global-config';
import { Platform } from './platform';

export class PlatformVertical extends Platform {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'platform-v');

    enableArcade(game, this);
    applyBodyConfig(this.body, { immovable: true });

    this.direction = Direction.Down;
    applyBodyConfig(this.body, { velocityY: this.velocity });
  }
}
