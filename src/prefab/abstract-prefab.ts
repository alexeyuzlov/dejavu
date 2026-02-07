import type { AbstractZone } from '../state/levels/abstract-zone';
import type { TextureKeyValue } from '../texture-keys';

export class AbstractPrefab extends Phaser.Sprite {
  level: AbstractZone;

  constructor(
    game: Phaser.Game,
    x: number,
    y: number,
    texture: TextureKeyValue | Phaser.BitmapData,
  ) {
    super(game, x, y, texture);

    this.level = this.game.state.states[this.game.state.current];

    game.add.existing(this);
  }
}
