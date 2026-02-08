import { Levels } from '../../../global-config';
import { Zone2 } from './zone-2';

export class Zone2Level1 extends Zone2 {
  constructor() {
    super({ key: Levels[Levels.Zone2Level1] });
  }

  preload() {
    super.preload();
    this.load.tilemapTiledJSON(this.sys.settings.key, 'assets/levels/2-1.json');
  }
}
