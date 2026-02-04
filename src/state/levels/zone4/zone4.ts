import { Assets } from '../../../assets';
import { AbstractZone } from '../abstract-zone';

export class Zone4 extends AbstractZone {
  bg: Phaser.GameObjects.TileSprite;

  preload() {
    this.load.image(Assets.images.zone4.key, Assets.images.zone4.path);
    super.preload();
  }

  create() {
    this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'bg');
    this.bg.setOrigin(0, 0);
    this.bg.setScrollFactor(0);

    super.create();
  }

  update() {
  }
}
