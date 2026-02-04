import { Assets } from '../../../assets';
import { AbstractZone } from '../abstract-zone';

export class Zone4 extends AbstractZone {
  bg: Phaser.TileSprite;

  preload() {
    this.game.load.image(Assets.images.zone4.key, Assets.images.zone4.path);
    super.preload();
  }

  create() {
    this.bg = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bg');
    this.bg.fixedToCamera = true;

    super.create();
  }

  update() {
    super.update();
  }
}
