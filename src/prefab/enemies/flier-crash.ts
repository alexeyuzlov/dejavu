import { TextureKey } from '../../texture-keys';
import { Egg } from '../bullets/egg';
import { AbstractEnemy } from './abstract-enemy';

export class FlierCrash extends AbstractEnemy {
  isActive = false;
  isAttackOver = false;
  minDistance: number;
  damagePoints = 11;
  velocity = 100;
  defensePoints = 6;
  lastEggShotAt: number;
  eggs: Phaser.Group;
  countEggs: number;
  shotDelay = 1500;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, TextureKey.FlierCrash);

    this.anchor.set(0.5, 0.5);
    this.health = 52;

    this.eggs = this.game.add.group();
    this.countEggs = 10;
    for (let i = 0; i < this.countEggs; i++) {
      const egg = new Egg(game, 0, 0);
      this.eggs.add(egg);
    }

    this.minDistance = this.level.player.width / 2;
    this.lastEggShotAt = this.game.time.now;

    this.animations.add(
      'fly',
      Phaser.Animation.generateFrameNames('flier-crash-', 1, 4, '.png', 0),
      20,
      true,
    );
    this.animations.play('fly');
  }

  update() {
    super.update();

    if (!this.inCamera || !this.alive) {
      this.body.velocity.setTo(0, 0);
      return;
    }

    if (!this.isAttackOver) {
      const distance = Phaser.Math.distance(
        this.x,
        this.y,
        this.level.player.x,
        this.level.player.y - this.level.player.body.height * 4,
      );

      if (distance > this.minDistance) {
        const rotation = Phaser.Math.angleBetween(
          this.x,
          this.y,
          this.level.player.x,
          this.level.player.y - this.level.player.body.height * 4,
        );

        this.body.velocity.x = Math.cos(rotation) * this.velocity;
        this.body.velocity.y = Math.sin(rotation) * this.velocity;
      } else {
        this.body.velocity.y = -30;

        if (this.level.player.x > this.x) {
          this.body.velocity.x = this.velocity;
        } else {
          this.body.velocity.x = -this.velocity;
        }
      }
    }

    if (this.game.time.now - this.lastEggShotAt < this.shotDelay) return;
    this.lastEggShotAt = this.game.time.now;

    const egg = this.eggs.getFirstDead();
    if (egg === null || egg === undefined) return;

    egg.revive();
    egg.reset(this.x, this.y);
    egg.body.velocity.y = egg.speed;
    egg.animations.play('egg');
  }
}
