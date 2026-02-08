import type { GameObjects, Scene } from 'phaser';
import { TextureKey } from '../../texture-keys';
import { BulletReject } from '../bullets/bullet-reject';
import { AbstractEnemy } from './abstract-enemy';

export class ShooterReject extends AbstractEnemy {
  lastBulletShotAt: number;
  bullets: GameObjects.Group;
  countBullets = 10;
  shotDelay = 3000;
  damagePoints = 10;
  defensePoints = 50;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, TextureKey.ShooterReject);

    this.body.setGravityY(300);
    this.lastBulletShotAt = this.scene.time.now;

    this.bullets = this.scene.add.group();
    this.bullets.runChildUpdate = true;
    for (let i = 0; i < this.countBullets; i++) {
      const bullet = new BulletReject(scene, 0, 0);
      this.bullets.add(bullet);
    }
    this.health = 100;

    this.scene.physics.add.collider(this, this.level.layer);
    this.scene.physics.add.overlap(this, this.bullets, (_shooterReject, bulletReject) => {
      const activeBullet = bulletReject as BulletReject;
      if (activeBullet.rejectState) {
        activeBullet.kill();
        this.makeDamage(activeBullet.damageRejectPoints);
      }
    });

    if (!this.scene.anims.exists('shooter-reject-stay')) {
      this.scene.anims.create({
        key: 'shooter-reject-stay',
        frames: [{ key: TextureKey.ShooterReject, frame: 'shooter-reject-stay-1.png' }],
        frameRate: 10,
        repeat: -1,
      });
    }
    if (!this.scene.anims.exists('shooter-reject-shot')) {
      this.scene.anims.create({
        key: 'shooter-reject-shot',
        frames: [{ key: TextureKey.ShooterReject, frame: 'shooter-reject-shot-1.png' }],
        frameRate: 10,
        repeat: -1,
      });
    }
    this.play('shooter-reject-stay', true);
    this.setOrigin(0.5, 0.5);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    if (!this.scene.cameras.main.worldView.contains(this.x, this.y) || !this.active) {
      this.body.setVelocity(0, 0);
      return;
    }

    if (this.scene.time.now - this.lastBulletShotAt < 333) {
      this.play('shooter-reject-shot', true);
    } else {
      this.play('shooter-reject-stay', true);
    }

    if (this.scene.time.now - this.lastBulletShotAt < this.shotDelay) return;
    this.lastBulletShotAt = this.scene.time.now;

    const bullet = this.bullets.getFirstDead(false) as BulletReject | null;

    if (bullet === null || bullet === undefined) return;

    bullet.revive();
    bullet.reset(this.x, this.y);

    if (this.x > this.level.player.x) {
      bullet.body.setVelocityX(-bullet.speed);
      bullet.setFlipX(true);
      this.setFlipX(true);
    } else {
      bullet.body.setVelocityX(bullet.speed);
      bullet.setFlipX(false);
      this.setFlipX(false);
    }
  }
}
