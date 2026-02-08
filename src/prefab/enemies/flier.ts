import type { Scene } from 'phaser';
import { Math as PhaserMath } from 'phaser';
import { TextureKey } from '../../texture-keys';
import { AbstractEnemy } from './abstract-enemy';

export class Flier extends AbstractEnemy {
  isActive = false;
  minDistance: number;
  damagePoints = 10;
  speed = 150;
  defensePoints = 7;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, TextureKey.Flier);

    this.setOrigin(0.5, 0.5);
    this.body.setAllowGravity(false);
    this.health = 84;

    this.minDistance = this.level.player.width / 2;
    this.isActive = true;

    if (!this.scene.anims.exists('flier-fly')) {
      this.scene.anims.create({
        key: 'flier-fly',
        frames: this.scene.anims.generateFrameNames(TextureKey.Flier, {
          prefix: 'flier-',
          start: 1,
          end: 4,
          suffix: '.png',
        }),
        frameRate: 20,
        repeat: -1,
      });
    }
    this.play('flier-fly', true);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    if (!this.scene.cameras.main.worldView.contains(this.x, this.y) || !this.active) {
      this.body.setVelocity(0, 0);
      return;
    }

    const distance = PhaserMath.Distance.Between(
      this.x,
      this.y,
      this.level.player.x,
      this.level.player.y,
    );

    if (distance > this.minDistance) {
      const rotation = PhaserMath.Angle.Between(
        this.x,
        this.y,
        this.level.player.x,
        this.level.player.y,
      );

      this.body.setVelocity(Math.cos(rotation) * this.speed, Math.sin(rotation) * this.speed);
    } else {
      this.body.setVelocity(0, 0);
    }
  }
}
