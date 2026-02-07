import type { AbstractZone } from '../../state/levels/abstract-zone';
import { ArcadePrefab } from '../arcade-prefab';
import type { Player } from '../player';
import type { TextureKeyValue } from '../../texture-keys';

export abstract class Bottle extends ArcadePrefab {
  level: AbstractZone;

  constructor(game: Phaser.Game, x: number, y: number, texture: TextureKeyValue) {
    super(game, x, y, texture);
  }

  abstract makeAction(): void;

  update() {
    this.game.physics.arcade.overlap(this.level.player, this, (_player: Player, bottle: Bottle) => {
      bottle.makeAction();
      bottle.kill();
    });
  }
}
