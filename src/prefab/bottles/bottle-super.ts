import { Bottle } from './bottle';

export class BottleSuper extends Bottle {
  duration: number = Phaser.Timer.SECOND * 10;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'bottle-super');
    game.physics.arcade.enable(this);
  }

  makeAction() {
    this.level.player.immortal(this.duration);
  }
}
