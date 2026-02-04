import { enableArcade } from '../../physics';
import { Bottle } from './bottle';

export class BottleHP extends Bottle {
  amount: number = 30;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'bottle-hp');
    enableArcade(game, this);
  }

  makeAction() {
    this.level.player.getHP(this.amount);
  }
}
