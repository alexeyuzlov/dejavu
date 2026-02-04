import { Assets } from '../../../assets';
import { Levels } from '../../../global-config';
import { Zone2 } from './zone2';

export class Zone2Level1 extends Zone2 {
  constructor() {
    super({ key: Levels[Levels.Zone2Level1] });
  }

  preload() {
    super.preload();
    this.load.tilemapTiledJSON(Assets.tilemaps.key, Assets.tilemaps.zone2);
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
