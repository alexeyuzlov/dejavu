import { Assets } from '../../../assets';
import { Levels } from '../../../global-config';
import { Zone1 } from './zone1';

export class Zone1Level1 extends Zone1 {
  constructor() {
    super({ key: Levels[Levels.Zone1Level1] });
  }

  preload() {
    super.preload();
    this.load.tilemapTiledJSON(Assets.tilemaps.key, Assets.tilemaps.zone1);
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}
