import { Assets } from '../../../assets';
import { Zone1 } from './zone1';

export class Zone1Level1 extends Zone1 {
  preload() {
    super.preload();
    this.game.load.tilemap(
      Assets.tilemaps.key,
      Assets.tilemaps.zone1,
      null,
      Phaser.Tilemap.TILED_JSON,
    );
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
