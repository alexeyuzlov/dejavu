import { overlapArcade, killSprite } from '../../physics';
import { AbstractPrefab } from '../abstract-prefab';

export class Bottle extends AbstractPrefab {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    overlapArcade(this.scene, this.level.player, this, (player: any, bottle: any) => {
      bottle.makeAction();
      killSprite(bottle);
    });
  }
}
