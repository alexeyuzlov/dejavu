import { TextureKey } from '../../texture-keys';
import { Bottle } from './bottle';
import type { Scene } from 'phaser';

export class BottleSuper extends Bottle {
  duration = 10000;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, TextureKey.BottleSuper);
  }

  drink() {
    this.level.player.immortal(this.duration);
  }
}
