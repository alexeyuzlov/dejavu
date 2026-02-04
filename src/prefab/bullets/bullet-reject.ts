import { applyBodyConfig, overlapArcade, enableArcade } from '../../physics';
import { AbstractPrefab } from '../abstract-prefab';

export class BulletReject extends AbstractPrefab {
  speed: number = 300;
  damagePoints: number = 25;
  damageRejectPoints: number = 300;
  rejectState: boolean = false;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'bullet-reject');

    enableArcade(game, this);
    this.anchor.set(0.5, 0.5);
    this.kill();

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
  }

  update() {
    overlapArcade(this.game, this, this.level.player, (bulletReject: any, player: any) => {
      if (bulletReject.rejectState) return;

      if (this.level.player.attackState) {
        bulletReject.scale.x = bulletReject.scale.x == 1 ? -1 : 1;
        applyBodyConfig(bulletReject.body, { velocityX: -bulletReject.body.velocity.x });
        bulletReject.rejectState = true;
      } else {
        bulletReject.kill();
        if (!this.level.player.immortalState) {
          this.level.player.makeDamage(bulletReject.damagePoints);
          this.level.hud.updateHealthState();
        }
      }
    });
  }
}
