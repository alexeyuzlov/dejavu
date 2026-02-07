import { BulletReject } from '../bullets/bullet-reject';
import { TextureKey } from '../../texture-keys';
import { AbstractEnemy } from './abstract-enemy';

export class ShooterReject extends AbstractEnemy {
  lastBulletShotAt: number;
  bullets: Phaser.Group;
  countBullets = 10;
  shotDelay = Phaser.Timer.SECOND * 3;
  damagePoints = 10;
  defensePoints = 50;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, TextureKey.ShooterReject);

    this.body.gravity.y = 300;
    this.lastBulletShotAt = this.game.time.now;

    this.bullets = this.game.add.group();
    for (let i = 0; i < this.countBullets; i++) {
      const bullet = new BulletReject(game, 0, 0);
      this.bullets.add(bullet);
    }
    this.health = 100;

    this.game.onResume.add(() => {
      this.lastBulletShotAt += this.game.time.pauseDuration;
    });

    this.animations.add('stay', ['shooter-reject-stay-1.png'], 10, true);
    this.animations.add('shot', ['shooter-reject-shot-1.png'], 10, true);
    this.animations.play('stay');
    this.anchor.set(0.5, 0.5);
  }

  update() {
    super.update();

    this.game.physics.arcade.collide(this, this.level.layer);

    this.game.physics.arcade.overlap(
      this,
      this.bullets,
      (shooterReject: ShooterReject, bulletReject: BulletReject) => {
        if (bulletReject.rejectState) {
          bulletReject.kill();
          shooterReject.makeDamage(bulletReject.damageRejectPoints);
        }
      },
    );

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

    const bullet = this.bullets.getFirstDead();

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
