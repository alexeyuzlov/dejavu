import { TextureKey } from '../../texture-keys';
import { Bottle } from './bottle';

export class BottleSuper extends Bottle {
  duration = Phaser.Timer.SECOND * 10;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, TextureKey.BottleSuper);
  }

  drink() {
    this.level.player.immortal(this.duration);
  }
}
