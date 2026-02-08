import { Levels } from '../../../global-config';
import { Boss } from '../../../prefab';
import { TextureKey } from '../../../texture-keys';
import { Zone4 } from './zone-4';

export class Zone4Level1 extends Zone4 {
  boss: Boss;

  constructor() {
    super({ key: Levels[Levels.Zone4Level1] });
  }

  preload() {
    super.preload();
    this.load.tilemapTiledJSON(this.sys.settings.key, 'assets/levels/4-1.json');
  }

  create() {
    super.create();

    // to debug fight vs boss
    // this.player.x = this.scale.width - 600;

    const bossTweens = this.getPrefabsFromMap(TextureKey.Tween);
    this.boss = new Boss(this, bossTweens);
  }
}
