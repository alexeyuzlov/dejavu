import { Assets } from '../../../assets';
import { AbstractZone } from '../abstract-zone';

export class Zone2 extends AbstractZone {
  bg: Phaser.GameObjects.TileSprite;
  lightRadius: number = 150;
  shadowTexture: Phaser.Textures.CanvasTexture;
  lightSprite: Phaser.GameObjects.Image;

  preload() {
    this.load.image(Assets.images.zone2.key, Assets.images.zone2.path);
    super.preload();
  }

  create() {
    this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'bg');
    this.bg.setOrigin(0, 0);
    this.bg.setScrollFactor(0);

    super.create();

    this.cameras.main.setBackgroundColor('#330169');

    this.shadowTexture = this.textures.createCanvas(
      'shadowTexture',
      this.map.widthInPixels,
      this.map.heightInPixels,
    );
    this.lightSprite = this.add.image(0, 0, 'shadowTexture');
    this.lightSprite.setOrigin(0, 0);
    this.lightSprite.setBlendMode(Phaser.BlendModes.MULTIPLY);
  }

  update() {
    super.update();
    this.shadowUpdate();

    this.children.bringToTop(this.hud);

    this.bg.tilePositionX = -this.player.x / 5;
  }

  shadowUpdate() {
    const ctx = this.shadowTexture.context;
    ctx.fillStyle = '#222222';
    ctx.fillRect(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const centerX = body ? body.center.x : this.player.x;
    const centerY = body ? body.center.y : this.player.y;
    const gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      this.lightRadius * 0.75,
      centerX,
      centerY,
      this.lightRadius,
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(
      centerX,
      centerY,
      this.lightRadius,
      0,
      Math.PI * 2,
    );
    ctx.fill();

    this.shadowTexture.refresh();
  }
}
