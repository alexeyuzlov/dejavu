import { Assets } from '../../../assets';
import { Zone3 } from './zone3';

export class Zone3Level1 extends Zone3 {
  preload() {
    super.preload();
    this.game.load.tilemap(
      Assets.tilemaps.key,
      Assets.tilemaps.zone3,
      null,
      Phaser.Tilemap.TILED_JSON,
    );
  }

  create() {
    super.create();

    this.player.y = 100;
  }

  update() {
    super.update();
  }
}
