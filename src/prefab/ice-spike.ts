import { applyBodyConfig, overlapArcade, killSprite } from '../physics';
import { AbstractPrefab } from './abstract-prefab';

export class IceSpike extends AbstractPrefab {
  damagePoints: number = 10;
  distanceToTarget: number = Math.random() * 100 - 40; // from - 40 to 60 px to target

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'ice-spike');
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    overlapArcade(this.scene, this.level.player, this, (player: any, ice: any) => {
      if (!this.level.player.immortalState) {
        this.level.player.makeDamage(ice.damagePoints);
        this.level.hud.updateHealthState();
      }
    });

    if (!this.scene.cameras.main.worldView.contains(this.x, this.y)) return;

    if (
      Math.abs(this.level.player.x - (this.body as Phaser.Physics.Arcade.Body).x) <
        this.distanceToTarget &&
      this.level.player.y > (this.body as Phaser.Physics.Arcade.Body).y
    ) {
      applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { gravityY: 100, accelerationY: 1000 });
    }

    if (this.y > this.scene.physics.world.bounds.height) {
      killSprite(this);
    }
  }
}
