import * as Prefab from "../../../Prefab";
import { TextureKey } from "../../../TextureKeys";
import { Zone4 } from "./Zone4";

export class Zone4Level1 extends Zone4 {
    boss: Prefab.Boss;

    preload() {
        super.preload();
        this.game.load.tilemap("map", "assets/levels/4-1.json", null, Phaser.Tilemap.TILED_JSON);
    }

    create() {
        super.create();

        //this.player.x = this.game.world.width - 600;

        const bossTweens = this.getPrefabsFromMap(TextureKey.Tween);
        this.boss = new Prefab.Boss(this.game, bossTweens);
    }

    update() {
        super.update();
    }
}
