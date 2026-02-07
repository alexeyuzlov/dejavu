import { AbstractPrefab } from './abstract-prefab';
import type { TextureKeyValue } from '../texture-keys';

export class ArcadePrefab extends AbstractPrefab {
  override body: Phaser.Physics.Arcade.Body;

  constructor(
    game: Phaser.Game,
    x: number,
    y: number,
    texture: TextureKeyValue | Phaser.BitmapData,
  ) {
    super(game, x, y, texture);
    game.physics.arcade.enable(this);
  }
}
