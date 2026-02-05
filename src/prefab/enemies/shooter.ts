import { applyBodyConfig } from '../../physics';
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
    this.lastBulletShotAt = this.scene.time.now;
    this.countBullets = 10;
    this.shotDelay = 3 * 1000;
    this.damagePoints = 10;
    this.defensePoints = 5;

    this.bullets = this.scene.add.group();
    for (var i = 0; i < this.countBullets; i++) {
      var bullet = new Bullet(scene, 0, 0);
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

    if (!this.scene.cameras.main.worldView.contains(this.x, this.y) || !this.active) {
      applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { velocityX: 0, velocityY: 0 });
      return;
    }

    if (this.scene.time.now - this.lastBulletShotAt < (1 / 4) * 1000) {
      this.anims.play('shooter-shot');
    } else {
      this.anims.play('shooter-stay');
    }

    if (this.scene.time.now - this.lastBulletShotAt < this.shotDelay) return;
    this.lastBulletShotAt = this.scene.time.now;

    var bullet = this.bullets.getFirstDead(false) as Bullet | null;

    if (bullet === null || bullet === undefined) return;

    bullet.setActive(true);
    bullet.setVisible(true);
    const spawnPoint = this.getCenter();
    const facing = this.scaleX >= 0 ? 1 : -1;
    const offsetX = facing * (this.displayWidth * 0.5 + bullet.displayWidth * 0.5);
    bullet.setPosition(spawnPoint.x + offsetX, spawnPoint.y);
    if (bullet.body) {
      bullet.body.enable = true;
      bullet.body.reset(spawnPoint.x, spawnPoint.y);
    }

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
