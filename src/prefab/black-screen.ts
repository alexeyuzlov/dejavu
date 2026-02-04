import { settings } from '../global-config';

export class BlackScreen extends Phaser.GameObjects.Container {
  text: Phaser.GameObjects.Text;
  background: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0);
    scene.add.existing(this);

    this.background = scene.add.rectangle(0, 0, scene.scale.width, scene.scale.height, 0x000000, 1);
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(0);

    this.text = scene.add.text(10, scene.scale.height - 30, '', settings.font.whiteBig);
    this.text.setScrollFactor(0);

    this.add([this.background, this.text]);
    this.setAlpha(1);
    this.setScrollFactor(0);
    this.setDepth(1000);
  }

  setText(text: string) {
    this.text.setText(text);
  }

  update() {
    this.setDepth(1000);
  }
}
