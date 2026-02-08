import { Direction } from '../../global-config';
import { Platform } from './platform';
import { TextureKey } from '../../texture-keys';
import type { Scene } from 'phaser';

export class PlatformHorizontal extends Platform {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, TextureKey.PlatformH);

    this.direction = Direction.Right;
    this.body.setVelocityX(this.velocity);
  }
}
