import type { Scene } from 'phaser';
import { TextureKey } from '../texture-keys';
import { ArcadePrefab } from './arcade-prefab';

export class IceSpike extends ArcadePrefab {
  damagePoints = 10;
  // TODO: Review gameplay impact of negative thresholds.
  distanceToTarget = Math.random() * 100 - 40; // from - 40 to 60 px to target

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, TextureKey.IceSpike);

    this.scene.physics.add.overlap(this.level.player, this, () => {
      this.level.player.makeDamage(this.damagePoints);
    });
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    if (!this.scene.cameras.main.worldView.contains(this.x, this.y)) return;

    if (
      Math.abs(this.level.player.x - this.body.x) < this.distanceToTarget &&
      this.level.player.y > this.body.y
    ) {
      this.body.setGravityY(100);
      this.body.setAccelerationY(1000);
    }

    if (this.y > this.scene.physics.world.bounds.height) {
      this.kill();
    }
  }
}
