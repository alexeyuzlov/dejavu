import { TextureKey } from '../texture-keys';
import { ArcadePrefab } from './arcade-prefab';

export class Exit extends ArcadePrefab {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, TextureKey.Exit);

    this.body.immovable = true;
  }

  update() {
    this.game.physics.arcade.collide(this.level.player, this.level.exits, () => {
      this.level.startNextLevel();
    });
  }
}
