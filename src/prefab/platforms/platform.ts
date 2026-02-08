import type { Scene } from 'phaser';
import { Direction } from '../../global-config';
import type { TextureKeyValue } from '../../texture-keys';
import { ArcadePrefab } from '../arcade-prefab';
import type { Player } from '../player';

export abstract class Platform extends ArcadePrefab {
  direction: Direction;
  velocity = 100;

  constructor(scene: Scene, x: number, y: number, texture: TextureKeyValue) {
    super(scene, x, y, texture);
    this.body.setImmovable(true);

    this.scene.physics.add.collider(
      this.level.player,
      this,
      undefined,
      (player: Player, platform: Platform) => {
        return player.y - platform.body.height <= platform.y;
      },
    );

    this.scene.physics.add.collider(this, this.level.transparents, () => {
      this.toggleDirection();
    });
  }

  toggleDirection() {
    switch (this.direction) {
      case Direction.Up:
        this.direction = Direction.Down;
        this.body.setVelocityY(this.velocity);
        break;
      case Direction.Down:
        this.direction = Direction.Up;
        this.body.setVelocityY(-this.velocity);
        break;
      case Direction.Left:
        this.direction = Direction.Right;
        this.body.setVelocityX(this.velocity);
        break;
      case Direction.Right:
        this.direction = Direction.Left;
        this.body.setVelocityX(-this.velocity);
        break;
      default:
        // Don't doing something
        break;
    }
  }
}
