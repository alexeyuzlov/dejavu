import { overlapArcade, enableArcade } from '../../physics';
import { AbstractPrefab } from '../abstract-prefab';
import { AbstractZone } from '../../state/levels/abstract-zone';

export class Bottle extends AbstractPrefab {
  level: AbstractZone;

  constructor(game: Phaser.Game, x: number, y: number, texture: string) {
    super(game, x, y, texture);
    enableArcade(game, this);
  }

  update() {
    overlapArcade(this.game, this.level.player, this, (player: any, bottle: any) => {
      bottle.makeAction();
      bottle.kill();
    });
  }
}
