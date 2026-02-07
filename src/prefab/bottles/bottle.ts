import type { TextureKeyValue } from '../../texture-keys';
import { ArcadePrefab } from '../arcade-prefab';
import type { Player } from '../player';

export abstract class Bottle extends ArcadePrefab {
  abstract drink(): void;

  constructor(game: Phaser.Game, x: number, y: number, texture: TextureKeyValue) {
    super(game, x, y, texture);
  }

  update() {
    this.game.physics.arcade.overlap(this.level.player, this, (_player: Player, bottle: Bottle) => {
      bottle.drink();
      bottle.kill();
    });
  }
}
