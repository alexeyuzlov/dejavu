import { applyBodyConfig, collideArcade, enableArcade } from '../../physics';
import { Direction } from '../../global-config';
import { AbstractPrefab } from '../abstract-prefab';

export class Platform extends AbstractPrefab {
  direction: Direction;
  velocity: number;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    enableArcade(scene, this);
    applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { immovable: true });
    this.velocity = 100;
  }

  toggleDirection() {
    switch (this.direction) {
      case Direction.Up:
        this.direction = Direction.Down;
        applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { velocityY: this.velocity });
        break;
      case Direction.Down:
        this.direction = Direction.Up;
        applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { velocityY: -this.velocity });
        break;
      case Direction.Left:
        this.direction = Direction.Right;
        applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { velocityX: this.velocity });
        break;
      case Direction.Right:
        this.direction = Direction.Left;
        applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { velocityX: -this.velocity });
        break;
      default:
        // Don't doing something
        break;
    }
  }

  update() {
    collideArcade(
      this.scene,
      this.level.player,
      this,
      null,
      (player: any, platform: any) => {
        return player.y - platform.body.height <= platform.y;
      },
    );

    collideArcade(
      this.scene,
      this,
      this.level.transparents,
      (platform: any, transparent: any) => {
        platform.toggleDirection();
      },
    );
  }
}
