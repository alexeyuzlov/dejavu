import { Assets } from '../../../assets';
import * as Prefab from '../../../prefab';
import { Zone4 } from './zone4';

export class Zone4Level1 extends Zone4 {
  boss: Prefab.Boss;

  preload() {
    super.preload();
    this.game.load.tilemap(
      Assets.tilemaps.key,
      Assets.tilemaps.zone4,
      null,
      Phaser.Tilemap.TILED_JSON,
    );
  }

  create() {
    super.create();

    //this.player.x = this.game.world.width - 600;

    var bossTweens = this.getPrefabsFromMap('tween');
    this.boss = new Prefab.Boss(this.game, bossTweens);
  }

  update() {
    super.update();
  }
}
