import { Direction } from '../../global-config';
import { Platform } from './platform';
import { TextureKey } from '../../texture-keys';
import type { Scene } from 'phaser';

export class PlatformVertical extends Platform {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, TextureKey.PlatformV);

    this.direction = Direction.Down;
    this.body.setVelocityY(this.velocity);
  }
}
