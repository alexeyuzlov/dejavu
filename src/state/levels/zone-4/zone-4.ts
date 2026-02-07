import { TextureKey } from "../../../texture-keys";
import { AbstractZone } from "../abstract-zone";

export class Zone4 extends AbstractZone {
    bg: Phaser.TileSprite;

    preload() {
        this.game.load.image(TextureKey.Bg, "assets/images/zone4.jpg");
        super.preload();
    }

    create() {
        this.bg = this.game.add.tileSprite(
            0,
            0,
            this.game.world.width,
            this.game.world.height,
            TextureKey.Bg
        );
        this.bg.fixedToCamera = true;

        super.create();
    }

    update() {
        super.update();
    }
}
