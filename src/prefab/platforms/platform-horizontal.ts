import { applyBodyConfig } from '../../physics';
import { Direction } from '../../global-config';
import { Platform } from './platform';

export class PlatformHorizontal extends Platform {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'platform-h');

    this.direction = Direction.Right;
    applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { velocityX: this.velocity });
  }
}
