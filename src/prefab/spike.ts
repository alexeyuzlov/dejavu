import type { Scene } from 'phaser';
import { TextureKey } from '../texture-keys';
import { ArcadePrefab } from './arcade-prefab';

export class Spike extends ArcadePrefab {
  damagePoints = 10;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, TextureKey.Spike);

    this.body.setImmovable(true);
    this.scene.physics.add.overlap(this.level.player, this, () => {
      this.level.player.makeDamage(this.damagePoints);
    });
  }
}
