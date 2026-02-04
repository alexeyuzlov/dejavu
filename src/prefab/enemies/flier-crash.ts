import { createGroup, getFirstDead, reviveAndReset } from '../../groups';
import { applyBodyConfig } from '../../physics';
import { timeNow } from '../../time';
import { Egg } from '../bullets/egg';
import { AbstractEnemy } from './abstract-enemy';

export class FlierCrash extends AbstractEnemy {
  isActive: boolean;
  isAttackOver: boolean;
  minDistance: number;
  damagePoints: number;
  velocity: number;
  defensePoints: number;
  lastEggShotAt: number;
  eggs: Phaser.Group;
  countEggs: number;
  shotDelay: number;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'flier-crash');

    this.anchor.set(0.5, 0.5);
    this.health = 52;

    this.eggs = createGroup(this.game);
    this.countEggs = 10;
    for (var i = 0; i < this.countEggs; i++) {
      var egg = new Egg(game, 0, 0);
      this.eggs.add(egg);
    }

    this.minDistance = this.level.player.width / 2;
    this.isAttackOver = false;
    this.damagePoints = 11;
    this.velocity = 100;
    this.isActive = false;
    this.defensePoints = 6;
    this.lastEggShotAt = timeNow(this.game);
    this.shotDelay = 1500;

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
      applyBodyConfig(this.body, { velocityX: 0, velocityY: 0 });
      return;
    }

    if (!this.isAttackOver) {
      var distance = Phaser.Math.distance(
        this.x,
        this.y,
        this.level.player.x,
        this.level.player.y - this.level.player.body.height * 4,
      );

      if (distance > this.minDistance) {
        var rotation = Phaser.Math.angleBetween(
          this.x,
          this.y,
          this.level.player.x,
          this.level.player.y - this.level.player.body.height * 4,
        );

        applyBodyConfig(this.body, {
          velocityX: Math.cos(rotation) * this.velocity,
          velocityY: Math.sin(rotation) * this.velocity,
        });
      } else {
        applyBodyConfig(this.body, { velocityY: -30 });

        if (this.level.player.x > this.x) {
          applyBodyConfig(this.body, { velocityX: this.velocity });
        } else {
          applyBodyConfig(this.body, { velocityX: -this.velocity });
        }
      }
    }

    if (timeNow(this.game) - this.lastEggShotAt < this.shotDelay) return;
    this.lastEggShotAt = timeNow(this.game);

    var egg = getFirstDead<Egg>(this.eggs);
    if (egg === null || egg === undefined) return;

    reviveAndReset(egg, this.x, this.y);
    applyBodyConfig(egg.body, { velocityY: egg.speed });
    egg.animations.play('egg');
  }
}
