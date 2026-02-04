import { applyBodyConfig } from '../../physics';
import { AbstractEnemy } from './abstract-enemy';

export class Flier extends AbstractEnemy {
  isActive: boolean = false;
  minDistance: number;
  damagePoints: number = 10;
  speed: number = 150;
  defensePoints: number = 7;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'flier');

    this.setOrigin(0.5, 0.5);
    this.health = 84;

    this.minDistance = this.level.player.width / 2;
    this.isActive = true;

    const anims = this.scene.anims;
    if (!anims.exists('flier-fly')) {
      anims.create({
        key: 'flier-fly',
        frames: anims.generateFrameNames('flier', {
          prefix: 'flier-',
          start: 1,
          end: 4,
          suffix: '.png',
        }),
        frameRate: 20,
        repeat: -1,
      });
    }
    this.anims.play('flier-fly');
  }

  update() {
    super.update();

    if (!this.scene.cameras.main.worldView.contains(this.x, this.y) || !this.active) {
      applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { velocityX: 0, velocityY: 0 });
      return;
    }

    const distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.level.player.x,
      this.level.player.y,
    );

    if (distance > this.minDistance) {
      const rotation = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        this.level.player.x,
        this.level.player.y,
      );

      applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, {
        velocityX: Math.cos(rotation) * this.speed,
        velocityY: Math.sin(rotation) * this.speed,
      });
    } else {
      applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { velocityX: 0, velocityY: 0 });
    }
  }
}
