import { Assets } from '../../../assets';
import { Zone2 } from './zone2';

export class Zone2Level1 extends Zone2 {
  preload() {
    super.preload();
    this.game.load.tilemap(
      Assets.tilemaps.key,
      Assets.tilemaps.zone2,
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
