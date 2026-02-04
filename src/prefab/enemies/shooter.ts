import { onResume } from '../../events';
import { createGroup, getFirstDead, reviveAndReset } from '../../groups';
import { applyBodyConfig, collideArcade } from '../../physics';
import { timeNow, secondsToMs } from '../../time';
import { Bullet } from '../bullets/bullet';
import { AbstractEnemy } from './abstract-enemy';

export class Shooter extends AbstractEnemy {
  gravity: number;
  lastBulletShotAt: number;
  bullets: Phaser.GameObjects.Group;
  countBullets: number;
  shotDelay: number;
  damagePoints: number;
  defensePoints: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'shooter');

    applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { gravityY: 300 });
    this.lastBulletShotAt = timeNow(this.scene);
    this.countBullets = 10;
    this.shotDelay = secondsToMs(3);
    this.damagePoints = 10;
    this.defensePoints = 5;

    this.bullets = createGroup(this.scene);
    for (var i = 0; i < this.countBullets; i++) {
      var bullet = new Bullet(scene, 0, 0);
      this.bullets.add(bullet);
    }
    this.health = 100;

    onResume(this.scene, (pauseDuration: number) => {
      this.lastBulletShotAt += pauseDuration;
    });

    const anims = this.scene.anims;
    if (!anims.exists('shooter-stay')) {
      anims.create({
        key: 'shooter-stay',
        frames: [{ key: 'shooter', frame: 'shooter-stay-1.png' }],
        frameRate: 10,
        repeat: -1,
      });
    }
    if (!anims.exists('shooter-shot')) {
      anims.create({
        key: 'shooter-shot',
        frames: [{ key: 'shooter', frame: 'shooter-shot-1.png' }],
        frameRate: 10,
        repeat: -1,
      });
    }
    this.anims.play('shooter-stay');
    this.setOrigin(0.5, 0.5);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    collideArcade(this.scene, this, this.level.layer);

    if (!this.scene.cameras.main.worldView.contains(this.x, this.y) || !this.active) {
      applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { velocityX: 0, velocityY: 0 });
      return;
    }

    if (timeNow(this.scene) - this.lastBulletShotAt < secondsToMs(1 / 4)) {
      this.anims.play('shooter-shot');
    } else {
      this.anims.play('shooter-stay');
    }

    if (timeNow(this.scene) - this.lastBulletShotAt < this.shotDelay) return;
    this.lastBulletShotAt = timeNow(this.scene);

    var bullet = getFirstDead<Bullet>(this.bullets);

    if (bullet === null || bullet === undefined) return;

    reviveAndReset(bullet, this.x, this.y);

    if (this.x > this.level.player.x) {
      this.scaleX = -1;
      bullet.scaleX = -1;
      applyBodyConfig(bullet.body as Phaser.Physics.Arcade.Body, { velocityX: -bullet.speed });
    } else {
      this.scaleX = 1;
      bullet.scaleX = 1;
      applyBodyConfig(bullet.body as Phaser.Physics.Arcade.Body, { velocityX: bullet.speed });
    }
  }
}
