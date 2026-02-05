import { applyBodyConfig, overlapArcade, killSprite } from '../../physics';
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
    this.lastBulletShotAt = this.scene.time.now;
    this.countBullets = 10;
    this.shotDelay = 3 * 1000;

    this.bullets = this.scene.add.group();
    for (var i = 0; i < this.countBullets; i++) {
      var bullet = new BulletReject(scene, 0, 0);
      this.bullets.add(bullet);
    }
    this.health = 100;

    let pausedAt = 0;
    this.scene.events.on(Phaser.Scenes.Events.PAUSE, () => {
      pausedAt = this.scene.time.now;
    });
    this.scene.events.on(Phaser.Scenes.Events.RESUME, () => {
      if (!pausedAt) return;
      const pauseDuration = this.scene.time.now - pausedAt;
      pausedAt = 0;
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

    if (this.scene.time.now - this.lastBulletShotAt < (1 / 3) * 1000) {
      this.anims.play('shooter-reject-shot');
    } else {
      this.anims.play('shooter-reject-stay');
    }

    if (this.scene.time.now - this.lastBulletShotAt < this.shotDelay) return;
    this.lastBulletShotAt = this.scene.time.now;

    var bullet = this.bullets.getFirstDead(false) as BulletReject | null;

    if (bullet === null || bullet === undefined) return;

    bullet.setActive(true);
    bullet.setVisible(true);

    const facing = this.x > this.level.player.x ? -1 : 1;
    this.scaleX = facing;
    bullet.scaleX = facing;
    bullet.rejectState = false;

    const spawnPoint = this.getCenter();
    const offsetX = facing * (this.displayWidth * 0.5 + bullet.displayWidth * 0.5);
    const spawnX = spawnPoint.x + offsetX;
    bullet.setPosition(spawnX, spawnPoint.y);
    if (bullet.body) {
      bullet.body.enable = true;
      bullet.body.reset(spawnX, spawnPoint.y);
      applyBodyConfig(bullet.body as Phaser.Physics.Arcade.Body, { velocityX: facing * bullet.speed });
    }
  }
}
