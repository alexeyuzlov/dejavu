import { applyBodyConfig } from '../../physics';
import { Direction } from '../../global-config';
import { Platform } from './platform';

export class PlatformVertical extends Platform {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'platform-v');

    this.direction = Direction.Down;
    applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { velocityY: this.velocity });
  }
}
