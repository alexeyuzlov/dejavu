import { applyBodyConfig, enableArcade } from '../physics';
import { AbstractPrefab } from './abstract-prefab';

export class Transparent extends AbstractPrefab {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'transparent');

    enableArcade(game, this);
    //this.body.immovable = true;
    applyBodyConfig(this.body, { moves: false });
  }
}
