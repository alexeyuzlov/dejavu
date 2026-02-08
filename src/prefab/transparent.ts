import { TextureKey } from '../texture-keys';
import { ArcadePrefab } from './arcade-prefab';
import type { Scene } from 'phaser';

export class Transparent extends ArcadePrefab {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, TextureKey.Transparent);
    this.body.setImmovable(true);
    this.body.moves = false;
  }
}
