import { onResume } from '../../events';
import { createGroup, getFirstDead, reviveAndReset } from '../../groups';
import { applyBodyConfig, collideArcade, overlapArcade, killSprite } from '../../physics';
import { timeNow, secondsToMs } from '../../time';
import { BulletReject } from '../bullets/bullet-reject';
import { AbstractEnemy } from './abstract-enemy';

export class ShooterReject extends AbstractEnemy {
  lastBulletShotAt: number;
  bullets: Phaser.GameObjects.Group;
  countBullets: number;
  shotDelay: number;
  damagePoints: number;
  defensePoints: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'shooter-reject');

    applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { gravityY: 300 });
    this.damagePoints = 10;
    this.defensePoints = 50;
    this.lastBulletShotAt = timeNow(this.scene);
    this.countBullets = 10;
    this.shotDelay = secondsToMs(3);

    this.bullets = createGroup(this.scene);
    for (var i = 0; i < this.countBullets; i++) {
      var bullet = new BulletReject(scene, 0, 0);
      this.bullets.add(bullet);
    }
    this.health = 100;

    onResume(this.scene, (pauseDuration: number) => {
      this.lastBulletShotAt += pauseDuration;
    });

    const anims = this.scene.anims;
    if (!anims.exists('shooter-reject-stay')) {
      anims.create({
        key: 'shooter-reject-stay',
        frames: [{ key: 'shooter-reject', frame: 'shooter-reject-stay-1.png' }],
        frameRate: 10,
        repeat: -1,
      });
    }
    if (!anims.exists('shooter-reject-shot')) {
      anims.create({
        key: 'shooter-reject-shot',
        frames: [{ key: 'shooter-reject', frame: 'shooter-reject-shot-1.png' }],
        frameRate: 10,
        repeat: -1,
      });
    }
    this.anims.play('shooter-reject-stay');
    this.setOrigin(0.5, 0.5);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    collideArcade(this.scene, this, this.level.layer);

    overlapArcade(this.scene, this, this.bullets, (shooterReject: any, bulletReject: any) => {
      if (bulletReject.rejectState) {
        killSprite(bulletReject);
        this.makeDamage(bulletReject.damageRejectPoints);
      }
    });

    if (!this.scene.cameras.main.worldView.contains(this.x, this.y) || !this.active) {
      applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { velocityX: 0, velocityY: 0 });
      return;
    }

    if (timeNow(this.scene) - this.lastBulletShotAt < secondsToMs(1 / 3)) {
      this.anims.play('shooter-reject-shot');
    } else {
      this.anims.play('shooter-reject-stay');
    }

    if (timeNow(this.scene) - this.lastBulletShotAt < this.shotDelay) return;
    this.lastBulletShotAt = timeNow(this.scene);

    var bullet = getFirstDead<BulletReject>(this.bullets);

    if (bullet === null || bullet === undefined) return;

    reviveAndReset(bullet, this.x, this.y);

    if (this.x > this.level.player.x) {
      applyBodyConfig(bullet.body as Phaser.Physics.Arcade.Body, { velocityX: -bullet.speed });
      bullet.scaleX = -1;
      this.scaleX = -1;
    } else {
      applyBodyConfig(bullet.body as Phaser.Physics.Arcade.Body, { velocityX: bullet.speed });
      bullet.scaleX = 1;
      this.scaleX = 1;
    }
  }
}
