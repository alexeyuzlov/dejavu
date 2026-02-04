import { Assets } from '../../../assets';
import { AbstractZone } from '../abstract-zone';

export class Zone1 extends AbstractZone {
  bg: Phaser.GameObjects.TileSprite;
  rainEmitter: Phaser.GameObjects.Particles.ParticleEmitter;

  preload() {
    super.preload();
    this.load.image(Assets.images.zone1.key, Assets.images.zone1.path);
    this.load.spritesheet(Assets.spritesheets.rain.key, Assets.spritesheets.rain.path, {
      frameWidth: Assets.spritesheets.rain.frameWidth,
      frameHeight: Assets.spritesheets.rain.frameHeight,
    });
  }

  create() {
    this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'bg');
    this.bg.setOrigin(0, 0);
    this.bg.setScrollFactor(0);

    super.create();

    this.cameras.main.setBackgroundColor('#D7F5FF');

    this.rainCreate();
  }

  update() {
    super.update();
    this.bg.tilePositionX -= 2;
  }

  rainCreate() {
    this.rainEmitter = this.add.particles(0, 0, Assets.spritesheets.rain.key, {
      x: this.scale.width / 2,
      y: -this.scale.height / 2,
      lifespan: 10000,
      quantity: 5,
      frequency: 5,
      scale: { min: 0.2, max: 0.7 },
      speedY: { min: 100, max: 700 },
      speedX: { min: -5, max: 5 },
      angle: { min: 20, max: 20 },
      rotate: 0,
      emitZone: {
        type: 'random',
        source: new Phaser.Geom.Rectangle(0, 0, this.scale.width + this.scale.width * 0.2, 1),
      },
    });
  }
}
