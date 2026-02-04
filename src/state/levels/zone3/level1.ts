import { Assets } from '../../../assets';
import { Levels } from '../../../global-config';
import { Zone3 } from './zone3';

export class Zone3Level1 extends Zone3 {
  constructor() {
    super({ key: Levels[Levels.Zone3Level1] });
  }

  preload() {
    super.preload();
    this.load.tilemapTiledJSON(Assets.tilemaps.key, Assets.tilemaps.zone3);
  }

  create() {
    super.create();

    this.player.y = 100;
  }

  update() {
    super.update();
  }
}
