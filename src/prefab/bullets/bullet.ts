import type { Scene } from 'phaser';
import { TextureKey, type TextureKeyValue } from '../../texture-keys';
import { ArcadePrefab } from '../arcade-prefab';

export class Bullet extends ArcadePrefab {
  speed = 300;
  damagePoints = 20;

  constructor(scene: Scene, x: number, y: number, texture: TextureKeyValue = TextureKey.Bullet) {
    super(scene, x, y, texture);
    this.setOrigin(0.5, 0.5);
    this.body.setAllowGravity(false);
    this.kill();
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    if (!this.active) {
      return;
    }

    const bounds = this.scene.physics.world.bounds;
    if (
      this.x < bounds.left ||
      this.x > bounds.right ||
      this.y < bounds.top ||
      this.y > bounds.bottom
    ) {
      this.kill();
    }
  }
}
