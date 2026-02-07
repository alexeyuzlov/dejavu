import { TextureKey } from '../texture-keys';
import { ArcadePrefab } from './arcade-prefab';

export class Transparent extends ArcadePrefab {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, TextureKey.Transparent);
    //this.body.immovable = true;
    this.body.moves = false;
  }
}
