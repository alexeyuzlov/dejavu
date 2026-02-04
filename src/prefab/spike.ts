import { applyBodyConfig, collideArcade, enableArcade } from '../physics';
import { AbstractPrefab } from './abstract-prefab';

export class Spike extends AbstractPrefab {
  damagePoints: number = 10;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'spike');

    enableArcade(scene, this);

    applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { immovable: true });
  }

  update() {
    collideArcade(this.scene, this.level.player, this, (player: any, spike: any) => {
      if (!this.level.player.immortalState) {
        this.level.player.makeDamage(spike.damagePoints);
        this.level.hud.updateHealthState();
      }
    });
  }
}
