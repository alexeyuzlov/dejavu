import { GameObjects, type Scene, type Textures } from 'phaser';
import { settings } from '../global-config';

export class BlackScreen extends GameObjects.Container {
  private text: GameObjects.Text;

  constructor(scene: Scene, text: string) {
    const textureKey = 'black-screen';
    if (!scene.textures.exists(textureKey)) {
      const canvasTexture = scene.textures.createCanvas(
        textureKey,
        scene.scale.width,
        scene.scale.height,
      ) as Textures.CanvasTexture;
      const ctx = canvasTexture.context;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvasTexture.width, canvasTexture.height);
      canvasTexture.refresh();
    }

    super(scene, 0, 0);

    const bg = scene.add.image(0, 0, textureKey);
    bg.setOrigin(0, 0);

    this.text = scene.add.text(10, scene.scale.height - 30, text, settings.font.whiteBig);

    this.add([bg, this.text]);
    this.alpha = 1;
    this.setScrollFactor(0);
    this.setDepth(1000);
    scene.add.existing(this);
  }

  setText(text: string) {
    this.text.setText(text);
  }
}
