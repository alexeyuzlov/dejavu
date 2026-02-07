import { TextureKey } from '../../texture-keys';
import { Bottle } from './bottle';

export class BottleHP extends Bottle {
  amount = 30;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, TextureKey.BottleHp);
  }

  drink() {
    this.level.player.getHP(this.amount);
  }
}
