import { Zone2 } from './Zone2';

export class Zone2Level1 extends Zone2 {
  preload() {
    super.preload();
    this.game.load.tilemap('map', 'assets/levels/2-1.json', null, Phaser.Tilemap.TILED_JSON);
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
