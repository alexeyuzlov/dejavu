import { collideArcade, killSprite } from '../../physics';
import { AbstractPrefab } from '../abstract-prefab';

export class Bullet extends AbstractPrefab {
  speed: number = 300;
  damagePoints: number = 20;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'bullet');

    this.setOrigin(0.5, 0.5);
    killSprite(this);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    collideArcade(this.scene, this, this.level.player, (bullet: any, player: any) => {
      killSprite(bullet);
      if (!this.level.player.immortalState) {
        this.level.player.makeDamage(bullet.damagePoints);
        this.level.hud.updateHealthState();
      }
    });

    const bounds = this.scene.physics.world.bounds;
    if (this.x < bounds.x || this.x > bounds.right || this.y < bounds.y || this.y > bounds.bottom) {
      killSprite(this);
    }
  }
}
