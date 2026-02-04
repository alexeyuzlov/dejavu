import { Direction } from '../../global-config';
import { AbstractPrefab } from '../abstract-prefab';

export class Platform extends AbstractPrefab {
  direction: Direction;
  velocity: number;

  constructor(game: Phaser.Game, x: number, y: number, texture: string) {
    super(game, x, y, texture);

    game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.velocity = 100;
  }

  toggleDirection() {
    switch (this.direction) {
      case Direction.Up:
        this.direction = Direction.Down;
        this.body.velocity.y = this.velocity;
        break;
      case Direction.Down:
        this.direction = Direction.Up;
        this.body.velocity.y = -this.velocity;
        break;
      case Direction.Left:
        this.direction = Direction.Right;
        this.body.velocity.x = this.velocity;
        break;
      case Direction.Right:
        this.direction = Direction.Left;
        this.body.velocity.x = -this.velocity;
        break;
      default:
        // Don't doing something
        break;
    }
  }

  update() {
    this.game.physics.arcade.collide(
      this.level.player,
      this,
      null,
      (player: any, platform: any) => {
        return player.y - platform.body.height <= platform.y;
      },
    );

    this.game.physics.arcade.collide(
      this,
      this.level.transparents,
      (platform: any, transparent: any) => {
        platform.toggleDirection();
      },
    );
  }
}
