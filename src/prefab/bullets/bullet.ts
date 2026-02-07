import { ArcadePrefab } from '../arcade-prefab';
import type { Player } from '../player';
import { TextureKey } from '../../texture-keys';

export class Bullet extends ArcadePrefab {
  speed = 300;
  damagePoints = 20;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, TextureKey.Bullet);
    this.anchor.set(0.5, 0.5);
    this.kill();

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
  }

  update() {
    this.game.physics.arcade.collide(this, this.level.player, (bullet: Bullet, _player: Player) => {
      bullet.kill();
      if (!this.level.player.immortalState) {
        this.level.player.makeDamage(bullet.damagePoints);
        this.level.hud.updateHealthState();
      }
    });
  }
}
