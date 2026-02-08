import type { GameObjects, Scene } from 'phaser';
import { Math as PhaserMath } from 'phaser';
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
  eggs: GameObjects.Group;
  countEggs: number;
  shotDelay = 1500;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, TextureKey.FlierCrash);

    this.setOrigin(0.5, 0.5);
    this.body.setAllowGravity(false);
    this.health = 52;

    this.eggs = this.scene.add.group();
    this.eggs.runChildUpdate = true;
    this.countEggs = 10;
    for (let i = 0; i < this.countEggs; i++) {
      const egg = new Egg(scene, 0, 0);
      this.eggs.add(egg);
    }

    this.minDistance = this.level.player.width / 2;
    this.lastEggShotAt = this.scene.time.now;

    if (!this.scene.anims.exists('flier-crash-fly')) {
      this.scene.anims.create({
        key: 'flier-crash-fly',
        frames: this.scene.anims.generateFrameNames(TextureKey.FlierCrash, {
          prefix: 'flier-crash-',
          start: 1,
          end: 4,
          suffix: '.png',
        }),
        frameRate: 20,
        repeat: -1,
      });
    }
    this.play('flier-crash-fly', true);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    if (!this.scene.cameras.main.worldView.contains(this.x, this.y) || !this.active) {
      this.body.setVelocity(0, 0);
      return;
    }

    if (!this.isAttackOver) {
      const distance = PhaserMath.Distance.Between(
        this.x,
        this.y,
        this.level.player.x,
        this.level.player.y - this.level.player.body.height * 4,
      );

      if (distance > this.minDistance) {
        const rotation = PhaserMath.Angle.Between(
          this.x,
          this.y,
          this.level.player.x,
          this.level.player.y - this.level.player.body.height * 4,
        );

        this.body.setVelocity(
          Math.cos(rotation) * this.velocity,
          Math.sin(rotation) * this.velocity,
        );
      } else {
        this.body.setVelocityY(-30);

        if (this.level.player.x > this.x) {
          this.body.setVelocityX(this.velocity);
        } else {
          this.body.setVelocityX(-this.velocity);
        }
      }
    }

    if (this.scene.time.now - this.lastEggShotAt < this.shotDelay) return;
    this.lastEggShotAt = this.scene.time.now;

    const egg = this.eggs.getFirstDead(false) as Egg | null;
    if (egg === null || egg === undefined) return;

    egg.revive();
    egg.reset(this.x, this.y);
    egg.resetEggState();
    egg.body.setVelocityY(egg.speed);
    egg.play('egg', true);
  }
}
