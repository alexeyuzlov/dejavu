import { Levels } from '../../../global-config';
import { Zone3 } from './zone-3';

export class Zone3Level1 extends Zone3 {
  constructor() {
    super({ key: Levels[Levels.Zone3Level1] });
  }

  preload() {
    super.preload();
    this.load.tilemapTiledJSON(this.sys.settings.key, 'assets/levels/3-1.json');
  }

  create() {
    super.create();

    this.player.y = 100;
  }
}
