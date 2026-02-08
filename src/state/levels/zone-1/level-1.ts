import { Levels } from '../../../global-config';
import { Zone1 } from './zone-1';

export class Zone1Level1 extends Zone1 {
  constructor() {
    super({ key: Levels[Levels.Zone1Level1] });
  }

  preload() {
    super.preload();
    this.load.tilemapTiledJSON(this.sys.settings.key, 'assets/levels/1-1.json');
  }
}
