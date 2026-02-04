import { Assets } from '../../../assets';
import { Levels } from '../../../global-config';
import * as Prefab from '../../../prefab';
import { Zone4 } from './zone4';

export class Zone4Level1 extends Zone4 {
  boss: Prefab.Boss;

  constructor() {
    super({ key: Levels[Levels.Zone4Level1] });
  }

  preload() {
    super.preload();
    this.load.tilemapTiledJSON(Assets.tilemaps.key, Assets.tilemaps.zone4);
  }

  create() {
    super.create();

    //this.player.x = this.game.world.width - 600;

    var bossTweens = this.getPrefabsFromMap('tween');
    this.boss = new Prefab.Boss(this, bossTweens);
  }

  update() {
    super.update();
  }
}
