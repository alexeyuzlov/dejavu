import type { Scene } from 'phaser';
import { TextureKey } from '../../texture-keys';
import { Bullet } from './bullet';

export class BulletReject extends Bullet {
  damagePoints = 25;
  damageRejectPoints = 300;
  rejectState = false;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, TextureKey.BulletReject);

    this.scene.physics.add.overlap(this, this.level.player, () => {
      if (this.rejectState) return;

      if (this.level.player.attackState) {
        this.setFlipX(!this.flipX);
        this.body.setVelocityX(-this.body.velocity.x);
        this.rejectState = true;
      } else {
        this.kill();
        this.level.player.makeDamage(this.damagePoints);
      }
    });
  }
}
