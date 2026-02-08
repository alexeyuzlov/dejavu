import type { GameObjects, Scene } from 'phaser';
import { TextureKey } from '../../texture-keys';
import { Bullet } from '../bullets/bullet';
import { AbstractEnemy } from './abstract-enemy';

export class Shooter extends AbstractEnemy {
  gravity = 300;
  lastBulletShotAt: number;
  bullets: GameObjects.Group;
  countBullets = 10;
  shotDelay = 3000;
  damagePoints = 10;
  defensePoints = 5;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, TextureKey.Shooter);

    this.body.setGravityY(this.gravity);
    this.lastBulletShotAt = this.scene.time.now;

    this.bullets = this.scene.add.group();
    this.bullets.runChildUpdate = true;
    for (let i = 0; i < this.countBullets; i++) {
      const bullet = new Bullet(scene, 0, 0);
      this.bullets.add(bullet);
    }
    this.health = 100;

    this.scene.physics.add.collider(this, this.level.layer);
    this.scene.physics.add.overlap(this.level.player, this.bullets, (_player, bullet) => {
      const activeBullet = bullet as Bullet;
      if (!activeBullet.active) return;
      activeBullet.kill();
      this.level.player.makeDamage(activeBullet.damagePoints);
    });

    if (!this.scene.anims.exists('shooter-stay')) {
      this.scene.anims.create({
        key: 'shooter-stay',
        frames: [{ key: TextureKey.Shooter, frame: 'shooter-stay-1.png' }],
        frameRate: 10,
        repeat: -1,
      });
    }
    if (!this.scene.anims.exists('shooter-shot')) {
      this.scene.anims.create({
        key: 'shooter-shot',
        frames: [{ key: TextureKey.Shooter, frame: 'shooter-shot-1.png' }],
        frameRate: 10,
        repeat: -1,
      });
    }
    this.play('shooter-stay', true);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    if (!this.scene.cameras.main.worldView.contains(this.x, this.y) || !this.active) {
      this.body.setVelocity(0, 0);
      return;
    }

    if (this.scene.time.now - this.lastBulletShotAt < 250) {
      this.play('shooter-shot', true);
    } else {
      this.play('shooter-stay', true);
    }

    if (this.scene.time.now - this.lastBulletShotAt < this.shotDelay) return;
    this.lastBulletShotAt = this.scene.time.now;

    const bullet = this.bullets.getFirstDead(false) as Bullet | null;

    if (bullet === null || bullet === undefined) return;

    bullet.revive();
    bullet.reset(this.x, this.y);

    if (this.x > this.level.player.x) {
      this.setFlipX(true);
      bullet.setFlipX(true);
      bullet.body.setVelocityX(-bullet.speed);
    } else {
      this.setFlipX(false);
      bullet.setFlipX(false);
      bullet.body.setVelocityX(bullet.speed);
    }
  }
}
