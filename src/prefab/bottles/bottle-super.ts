import { Bottle } from './bottle';
import { TextureKey } from '../../texture-keys';

export class BottleSuper extends Bottle {
  duration: number = Phaser.Timer.SECOND * 10;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, TextureKey.BottleSuper);
    game.physics.arcade.enable(this);
  }

  makeAction() {
    this.level.player.immortal(this.duration);
  }
}
