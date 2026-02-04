import { applyBodyConfig, collideArcade } from '../../physics';
import { Direction } from '../../global-config';
import { AbstractEnemy } from './abstract-enemy';

export class Runner extends AbstractEnemy {
  gravity: number;
  velocity: number;
  direction: Direction;
  damagePoints: number;
  defensePoints: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'runner');

    this.gravity = 300;
    this.velocity = 100;

    this.direction = Direction.Right;
    applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { velocityX: this.velocity });

    this.damagePoints = 9;
    this.defensePoints = 3;

    applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, {
      gravityY: this.gravity,
      collideWorldBounds: true,
    });
    this.health = 90;

    this.setOrigin(0.5, 1);

    const anims = this.scene.anims;
    if (!anims.exists('runner-walk')) {
      anims.create({
        key: 'runner-walk',
        frames: anims.generateFrameNames('runner', {
          prefix: 'runner-',
          start: 1,
          end: 4,
          suffix: '.png',
        }),
        frameRate: 5,
        repeat: -1,
      });
    }
    this.anims.play('runner-walk');
  }

  toggleDirection() {
    switch (this.direction) {
      case Direction.Left:
        this.direction = Direction.Right;
        applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { velocityX: this.velocity });
        this.scaleX = 1;
        break;
      case Direction.Right:
        this.direction = Direction.Left;
        applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { velocityX: -this.velocity });
        this.scaleX = -1;
        break;
      default:
    }
  }

  update() {
    super.update();

    collideArcade(this.scene, this, this.level.layer);

    collideArcade(this.scene, this, this.level.transparents, (runner: any, transparent: any) => {
      runner.toggleDirection();
    });

    const body = this.body as Phaser.Physics.Arcade.Body;
    if (body.blocked.left || body.blocked.right) {
      this.toggleDirection();
    }
  }
}
