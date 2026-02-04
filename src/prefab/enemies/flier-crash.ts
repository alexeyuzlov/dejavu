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
  eggs: Phaser.GameObjects.Group;
  countEggs: number;
  shotDelay: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'flier-crash');

    this.setOrigin(0.5, 0.5);
    this.health = 52;

    this.eggs = createGroup(this.scene);
    this.countEggs = 10;
    for (var i = 0; i < this.countEggs; i++) {
      var egg = new Egg(scene, 0, 0);
      this.eggs.add(egg);
    }

    this.minDistance = this.level.player.width / 2;
    this.isAttackOver = false;
    this.damagePoints = 11;
    this.velocity = 100;
    this.isActive = false;
    this.defensePoints = 6;
    this.lastEggShotAt = timeNow(this.scene);
    this.shotDelay = 1500;

    const anims = this.scene.anims;
    if (!anims.exists('flier-crash-fly')) {
      anims.create({
        key: 'flier-crash-fly',
        frames: anims.generateFrameNames('flier-crash', {
          prefix: 'flier-crash-',
          start: 1,
          end: 4,
          suffix: '.png',
        }),
        frameRate: 20,
        repeat: -1,
      });
    }
    this.anims.play('flier-crash-fly');
  }

  update() {
    super.update();

    if (!this.scene.cameras.main.worldView.contains(this.x, this.y) || !this.active) {
      applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { velocityX: 0, velocityY: 0 });
      return;
    }

    if (!this.isAttackOver) {
      const playerBody = this.level.player.body as Phaser.Physics.Arcade.Body;
      const distance = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.level.player.x,
        this.level.player.y - playerBody.height * 4,
      );

      if (distance > this.minDistance) {
        const rotation = Phaser.Math.Angle.Between(
          this.x,
          this.y,
          this.level.player.x,
          this.level.player.y - playerBody.height * 4,
        );

        applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, {
          velocityX: Math.cos(rotation) * this.velocity,
          velocityY: Math.sin(rotation) * this.velocity,
        });
      } else {
        applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { velocityY: -30 });

        if (this.level.player.x > this.x) {
          applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { velocityX: this.velocity });
        } else {
          applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { velocityX: -this.velocity });
        }
      }
    }

    if (timeNow(this.scene) - this.lastEggShotAt < this.shotDelay) return;
    this.lastEggShotAt = timeNow(this.scene);

    var egg = getFirstDead<Egg>(this.eggs);
    if (egg === null || egg === undefined) return;

    reviveAndReset(egg, this.x, this.y);
    applyBodyConfig(egg.body as Phaser.Physics.Arcade.Body, { velocityY: egg.speed });
    egg.anims.play('egg');
  }
}
