import { enableArcade } from '../../physics';
import { secondsToMs } from '../../time';
import { Bottle } from './bottle';

export class BottleSuper extends Bottle {
  duration: number = secondsToMs(10);

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'bottle-super');
    enableArcade(game, this);
  }

  makeAction() {
    this.level.player.immortal(this.duration);
  }
}
