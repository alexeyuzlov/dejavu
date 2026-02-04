import { applyBodyConfig, overlapArcade, killSprite } from '../../physics';
import { AbstractPrefab } from '../abstract-prefab';

export class BulletReject extends AbstractPrefab {
  speed: number = 300;
  damagePoints: number = 25;
  damageRejectPoints: number = 300;
  rejectState: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'bullet-reject');

    this.setOrigin(0.5, 0.5);
    killSprite(this);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    overlapArcade(this.scene, this, this.level.player, (bulletReject: any, player: any) => {
      if (bulletReject.rejectState) return;

      if (this.level.player.attackState) {
        bulletReject.scaleX = bulletReject.scaleX === 1 ? -1 : 1;
        applyBodyConfig(bulletReject.body as Phaser.Physics.Arcade.Body, {
          velocityX: -(bulletReject.body as Phaser.Physics.Arcade.Body).velocity.x,
        });
        bulletReject.rejectState = true;
      } else {
        killSprite(bulletReject);
        if (!this.level.player.immortalState) {
          this.level.player.makeDamage(bulletReject.damagePoints);
          this.level.hud.updateHealthState();
        }
      }
    });

    const bounds = this.scene.physics.world.bounds;
    if (this.x < bounds.x || this.x > bounds.right || this.y < bounds.y || this.y > bounds.bottom) {
      killSprite(this);
    }
  }
}
