import { secondsToMs } from '../../time';
import { Bottle } from './bottle';

export class BottleSuper extends Bottle {
  duration: number = secondsToMs(10);

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'bottle-super');
  }

  makeAction() {
    this.level.player.immortal(this.duration);
  }
}
