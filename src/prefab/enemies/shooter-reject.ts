import { onResume } from '../../events';
import { createGroup, getFirstDead, reviveAndReset } from '../../groups';
import { applyBodyConfig, collideArcade, overlapArcade } from '../../physics';
import { timeNow, secondsToMs } from '../../time';
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

    applyBodyConfig(this.body, { gravityY: 300 });
    this.damagePoints = 10;
    this.defensePoints = 50;
    this.lastBulletShotAt = timeNow(this.game);
    this.countBullets = 10;
    this.shotDelay = secondsToMs(3);

    this.bullets = createGroup(this.game);
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
      applyBodyConfig(this.body, { velocityX: 0, velocityY: 0 });
      return;
    }

    if (timeNow(this.game) - this.lastBulletShotAt < secondsToMs(1 / 3)) {
      this.animations.play('shot');
    } else {
      this.animations.play('stay');
    }

    if (timeNow(this.game) - this.lastBulletShotAt < this.shotDelay) return;
    this.lastBulletShotAt = timeNow(this.game);

    var bullet = getFirstDead<BulletReject>(this.bullets);

    if (bullet === null || bullet === undefined) return;

    reviveAndReset(bullet, this.x, this.y);

    if (this.x > this.level.player.x) {
      applyBodyConfig(bullet.body, { velocityX: -bullet.speed });
      bullet.scale.x = -1;
      this.scale.x = -1;
    } else {
      applyBodyConfig(bullet.body, { velocityX: bullet.speed });
      bullet.scale.x = 1;
      this.scale.x = 1;
    }
  }
}
