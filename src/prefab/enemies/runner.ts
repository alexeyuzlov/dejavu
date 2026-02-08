import type { Scene } from 'phaser';
import { Direction } from '../../global-config';
import { TextureKey } from '../../texture-keys';
import { AbstractEnemy } from './abstract-enemy';

export class Runner extends AbstractEnemy {
  gravity = 300;
  velocity = 100;
  direction = Direction.Right;
  damagePoints = 9;
  defensePoints = 3;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, TextureKey.Runner);

    this.body.setVelocityX(this.velocity);

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.health = 90;

    this.setOrigin(0.5, 1);

    if (!this.scene.anims.exists('runner-walk')) {
      this.scene.anims.create({
        key: 'runner-walk',
        frames: this.scene.anims.generateFrameNames(TextureKey.Runner, {
          prefix: 'runner-',
          start: 1,
          end: 4,
          suffix: '.png',
        }),
        frameRate: 5,
        repeat: -1,
      });
    }
    this.play('runner-walk', true);

    this.scene.physics.add.collider(this, this.level.layer);
    this.scene.physics.add.collider(this, this.level.transparents, () => {
      this.toggleDirection();
    });
  }

  toggleDirection() {
    switch (this.direction) {
      case Direction.Left:
        this.direction = Direction.Right;
        this.body.setVelocityX(this.velocity);
        this.setFlipX(false);
        break;
      case Direction.Right:
        this.direction = Direction.Left;
        this.body.setVelocityX(-this.velocity);
        this.setFlipX(true);
        break;
      default:
    }
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    if (this.body.blocked.left || this.body.blocked.right) {
      this.toggleDirection();
    }
  }
}
