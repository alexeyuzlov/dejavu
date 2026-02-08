import type { Scene } from 'phaser';
import { TextureKey } from '../../texture-keys';
import { Bottle } from './bottle';

export class BottleHP extends Bottle {
  amount = 30;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, TextureKey.BottleHp);
  }

  drink() {
    this.level.player.getHP(this.amount);
  }
}
