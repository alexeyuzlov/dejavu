import { applyBodyConfig, overlapArcade, enableArcade } from '../physics';
import { AbstractPrefab } from './abstract-prefab';

export class IceSpike extends AbstractPrefab {
  damagePoints: number = 10;
  distanceToTarget: number = Math.random() * 100 - 40; // from - 40 to 60 px to target

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'ice-spike');
    enableArcade(game, this);

    this.checkWorldBounds = true;
  }

  update() {
    overlapArcade(this.game, this.level.player, this, (player: any, ice: any) => {
      if (!this.level.player.immortalState) {
        this.level.player.makeDamage(ice.damagePoints);
        this.level.hud.updateHealthState();
      }
    });

    if (!this.inCamera) return;

    if (
      Math.abs(this.level.player.x - this.body.x) < this.distanceToTarget &&
      this.level.player.y > this.body.y
    ) {
      applyBodyConfig(this.body, { gravityY: 100, accelerationY: 1000 });
    }

    if (this.y > this.game.world.height) {
      this.kill();
    }
  }
}
