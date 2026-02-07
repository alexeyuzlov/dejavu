import { ArcadePrefab } from '../arcade-prefab';
import type { Player } from '../player';
import { TextureKey } from '../../texture-keys';

export class BulletReject extends ArcadePrefab {
  speed = 300;
  damagePoints = 25;
  damageRejectPoints = 300;
  rejectState = false;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, TextureKey.BulletReject);
    this.anchor.set(0.5, 0.5);
    this.kill();

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
  }

  update() {
    this.game.physics.arcade.overlap(
      this,
      this.level.player,
      (bulletReject: BulletReject, _player: Player) => {
        if (bulletReject.rejectState) return;

        if (this.level.player.attackState) {
          bulletReject.scale.x = bulletReject.scale.x == 1 ? -1 : 1;
          bulletReject.body.velocity.x = -bulletReject.body.velocity.x;
          bulletReject.rejectState = true;
        } else {
          bulletReject.kill();
          this.level.player.makeDamage(bulletReject.damagePoints);
        }
      },
    );
  }
}
