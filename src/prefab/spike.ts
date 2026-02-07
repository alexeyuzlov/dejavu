import { TextureKey } from '../texture-keys';
import { ArcadePrefab } from './arcade-prefab';
import type { Player } from './player';

export class Spike extends ArcadePrefab {
  damagePoints = 10;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, TextureKey.Spike);

    this.body.immovable = true;
  }

  update() {
    this.game.physics.arcade.collide(this.level.player, this, (_player: Player, spike: Spike) => {
      if (!this.level.player.immortalState) {
        this.level.player.makeDamage(spike.damagePoints);
        this.level.hud.updateHealthState();
      }
    });
  }
}
