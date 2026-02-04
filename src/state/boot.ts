import { StateKeys } from '../global-config';

export class Boot extends Phaser.Scene {
  constructor() {
    super({ key: StateKeys.Boot });
  }

  preload() {
    this.load.image('preload-bar', 'assets/images/prefabs/preload-bar.png');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000');
    this.scene.start(StateKeys.Preload);
  }
}
