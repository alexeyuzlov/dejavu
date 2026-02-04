import { applyBodyConfig, collideArcade } from '../../physics';
import { Direction } from '../../global-config';
import { AbstractEnemy } from './abstract-enemy';

export class Runner extends AbstractEnemy {
  gravity: number;
  velocity: number;
  direction: Direction;
  damagePoints: number;
  defensePoints: number;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'runner');

    this.gravity = 300;
    this.velocity = 100;

    this.direction = Direction.Right;
    applyBodyConfig(this.body, { velocityX: this.velocity });

    this.damagePoints = 9;
    this.defensePoints = 3;

    applyBodyConfig(this.body, { gravityY: this.gravity, collideWorldBounds: true });
    this.health = 90;

    this.anchor.set(0.5, 1);

    this.animations.add(
      'walk',
      Phaser.Animation.generateFrameNames('runner-', 1, 4, '.png', 0),
      5,
      true,
    );
    this.animations.play('walk');
  }

  toggleDirection() {
    switch (this.direction) {
      case Direction.Left:
        this.direction = Direction.Right;
        applyBodyConfig(this.body, { velocityX: this.velocity });
        this.scale.x = 1;
        break;
      case Direction.Right:
        this.direction = Direction.Left;
        applyBodyConfig(this.body, { velocityX: -this.velocity });
        this.scale.x = -1;
        break;
      default:
    }
  }

  update() {
    super.update();

    collideArcade(this.game, this, this.level.layer);

    collideArcade(this.game, this, this.level.transparents, (runner: any, transparent: any) => {
      runner.toggleDirection();
    });

    if (this.body.blocked.left || this.body.blocked.right) {
      this.toggleDirection();
    }
  }
}
