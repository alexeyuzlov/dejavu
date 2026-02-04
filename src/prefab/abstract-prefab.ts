import { AbstractZone } from '../state/levels/abstract-zone';

export class AbstractPrefab extends Phaser.Sprite {
  level: AbstractZone;

  constructor(game: Phaser.Game, x: number, y: number, texture: string | Phaser.BitmapData) {
    super(game, x, y, texture);

    this.level = (this.game.state.states as any)[this.game.state.current];

    game.add.existing(this);
  }
}
