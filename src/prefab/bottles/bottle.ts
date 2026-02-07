import { ArcadePrefab } from '../arcade-prefab';
import type { Player } from '../player';

export abstract class Bottle extends ArcadePrefab {
  abstract drink(): void;

  update() {
    this.game.physics.arcade.overlap(this.level.player, this, (_player: Player, bottle: Bottle) => {
      bottle.drink();
      bottle.kill();
    });
  }
}
