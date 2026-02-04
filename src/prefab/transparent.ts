import { applyBodyConfig, enableArcade } from '../physics';
import { AbstractPrefab } from './abstract-prefab';

export class Transparent extends AbstractPrefab {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'transparent');

    enableArcade(scene, this);
    //this.body.immovable = true;
    applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { moves: false });
  }
}
