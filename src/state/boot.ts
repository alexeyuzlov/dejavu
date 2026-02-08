import { TextureKey } from '../texture-keys';
import { Scene } from 'phaser';

export class Boot extends Scene {
  constructor() {
    super({ key: 'boot' });
  }

  preload() {
    this.load.image(TextureKey.PreloadBar, 'assets/images/prefabs/preload-bar.png');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000');
    this.scene.start('preload');
  }
}
