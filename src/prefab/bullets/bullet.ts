import { TextureKey, type TextureKeyValue } from '../../texture-keys';
import { ArcadePrefab } from '../arcade-prefab';
import type { Player } from '../player';

export class Bullet extends ArcadePrefab {
  speed = 300;
  damagePoints = 20;

  constructor(
    game: Phaser.Game,
    x: number,
    y: number,
    texture: TextureKeyValue = TextureKey.Bullet,
  ) {
    super(game, x, y, texture);
    this.anchor.set(0.5, 0.5);
    this.kill();

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
  }

  update() {
    this.game.physics.arcade.collide(this, this.level.player, (bullet: Bullet, _player: Player) => {
      bullet.kill();
      this.level.player.makeDamage(bullet.damagePoints);
    });
  }
}
