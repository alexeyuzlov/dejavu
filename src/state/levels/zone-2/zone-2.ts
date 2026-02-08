import type { GameObjects, Textures } from 'phaser';
import { BlendModes } from 'phaser';
import { AbstractZone } from '../abstract-zone';

export class Zone2 extends AbstractZone {
  lightRadius = 150;
  shadowTexture: Textures.CanvasTexture;
  lightSprite: GameObjects.Image;

  preload() {
    this.load.image(this.bgKey, 'assets/images/zone2.png');
    super.preload();
  }

  create() {
    super.create();

    this.cameras.main.setBackgroundColor('#330169');

    if (!this.textures.exists('zone2-shadow')) {
      this.shadowTexture = this.textures.createCanvas(
        'zone2-shadow',
        this.map.widthInPixels,
        this.map.heightInPixels,
      );
    } else {
      this.shadowTexture = this.textures.get('zone2-shadow') as Textures.CanvasTexture;
    }
    this.lightSprite = this.add.image(0, 0, 'zone2-shadow').setOrigin(0, 0);
    this.lightSprite.setBlendMode(BlendModes.MULTIPLY);
  }

  update(time: number, delta: number) {
    super.update(time, delta);
    this.shadowUpdate();

    this.children.bringToTop(this.hud);

    this.bg.tilePositionX = -this.player.x / 5;
  }

  shadowUpdate() {
    this.shadowTexture.context.fillStyle = '#222222';
    this.shadowTexture.context.fillRect(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    const gradient = this.shadowTexture.context.createRadialGradient(
      this.player.body.x,
      this.player.body.y,
      this.lightRadius * 0.75,
      this.player.body.x,
      this.player.body.y,
      this.lightRadius,
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    this.shadowTexture.context.beginPath();
    this.shadowTexture.context.fillStyle = gradient;
    this.shadowTexture.context.arc(
      this.player.body.x,
      this.player.body.y,
      this.lightRadius,
      0,
      Math.PI * 2,
    );
    this.shadowTexture.context.fill();

    this.shadowTexture.refresh();
  }
}
