import type { Scene } from 'phaser';
import { TextureKey } from '../texture-keys';
import { ArcadePrefab } from './arcade-prefab';

export class Exit extends ArcadePrefab {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, TextureKey.Exit);

    this.body.setImmovable(true);
    this.scene.physics.add.overlap(this.level.player, this, () => {
      this.level.startNextLevel();
    });
  }
}
