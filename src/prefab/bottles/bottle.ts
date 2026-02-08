import type { Scene } from 'phaser';
import { ArcadePrefab } from '../arcade-prefab';

export abstract class Bottle extends ArcadePrefab {
  abstract drink(): void;

  constructor(scene: Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.scene.physics.add.overlap(this.level.player, this, () => {
      this.drink();
      this.kill();
    });
  }
}
