import { collideArcade, enableArcade } from '../physics';
import { AbstractPrefab } from './abstract-prefab';

export class Spike extends AbstractPrefab {
  damagePoints: number = 10;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'spike');

    enableArcade(game, this);

    this.body.immovable = true;
  }

  update() {
    collideArcade(this.game, this.level.player, this, (player: any, spike: any) => {
      if (!this.level.player.immortalState) {
        this.level.player.makeDamage(spike.damagePoints);
        this.level.hud.updateHealthState();
      }
    });
  }
}
