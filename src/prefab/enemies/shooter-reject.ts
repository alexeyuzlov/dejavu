import { onResume } from '../../events';
import { collideArcade, overlapArcade } from '../../physics';
import { BulletReject } from '../bullets/bullet-reject';
import { AbstractEnemy } from './abstract-enemy';

export class ShooterReject extends AbstractEnemy {
  lastBulletShotAt: number;
  bullets: Phaser.Group;
  countBullets: number;
  shotDelay: number;
  damagePoints: number;
  defensePoints: number;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'shooter-reject');

    this.body.gravity.y = 300;
    this.damagePoints = 10;
    this.defensePoints = 50;
    this.lastBulletShotAt = this.game.time.now;
    this.countBullets = 10;
    this.shotDelay = Phaser.Timer.SECOND * 3;

    this.bullets = this.game.add.group();
    for (var i = 0; i < this.countBullets; i++) {
      var bullet = new BulletReject(game, 0, 0);
      this.bullets.add(bullet);
    }
    this.health = 100;

    onResume(this.game, () => {
      this.lastBulletShotAt += this.game.time.pauseDuration;
    });

    this.animations.add('stay', ['shooter-reject-stay-1.png'], 10, true);
    this.animations.add('shot', ['shooter-reject-shot-1.png'], 10, true);
    this.animations.play('stay');
    this.anchor.set(0.5, 0.5);
  }

  update() {
    super.update();

    collideArcade(this.game, this, this.level.layer);

    overlapArcade(this.game, this, this.bullets, (shooterReject: any, bulletReject: any) => {
      if (bulletReject.rejectState) {
        bulletReject.kill();
        this.makeDamage(bulletReject.damageRejectPoints);
      }
    });

    if (!this.inCamera || !this.alive) {
      this.body.velocity.setTo(0, 0);
      return;
    }

    if (this.game.time.now - this.lastBulletShotAt < Phaser.Timer.SECOND / 3) {
      this.animations.play('shot');
    } else {
      this.animations.play('stay');
    }

    if (this.game.time.now - this.lastBulletShotAt < this.shotDelay) return;
    this.lastBulletShotAt = this.game.time.now;

    var bullet = this.bullets.getFirstDead();

    if (bullet === null || bullet === undefined) return;

    bullet.revive();
    bullet.reset(this.x, this.y);

    if (this.x > this.level.player.x) {
      bullet.body.velocity.x = -bullet.speed;
      bullet.scale.x = -1;
      this.scale.x = -1;
    } else {
      bullet.body.velocity.x = bullet.speed;
      bullet.scale.x = 1;
      this.scale.x = 1;
    }
  }
}
