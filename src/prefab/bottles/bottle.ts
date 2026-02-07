import type { TextureKeyValue } from '../../texture-keys';
import { ArcadePrefab } from '../arcade-prefab';
import type { Player } from '../player';

export abstract class Bottle extends ArcadePrefab {
  constructor(game: Phaser.Game, x: number, y: number, texture: TextureKeyValue) {
    super(game, x, y, texture);
  }

  abstract drink(): void;

  update() {
    this.game.physics.arcade.overlap(this.level.player, this, (_player: Player, bottle: Bottle) => {
      bottle.drink();
      bottle.kill();
    });
  }
}
