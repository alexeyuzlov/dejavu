import { Bottle } from './bottle';

export class BottleHP extends Bottle {
  amount: number = 30;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'bottle-hp');
  }

  makeAction() {
    this.level.player.getHP(this.amount);
  }
}
