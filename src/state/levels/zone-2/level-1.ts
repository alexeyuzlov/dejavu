import { Zone2 } from './zone-2';

export class Zone2Level1 extends Zone2 {
  preload() {
    super.preload();
    this.game.load.tilemap('map', 'assets/levels/2-1.json', null, Phaser.Tilemap.TILED_JSON);
  }
}
