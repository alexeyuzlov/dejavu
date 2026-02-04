import { applyBodyConfig, enableArcade } from '../../physics';
import { Direction } from '../../global-config';
import { Platform } from './platform';

export class PlatformHorizontal extends Platform {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'platform-h');

    enableArcade(game, this);
    applyBodyConfig(this.body, { immovable: true });

    this.direction = Direction.Right;
    applyBodyConfig(this.body, { velocityX: this.velocity });
  }
}
