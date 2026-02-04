import { Assets } from '../../../assets';
import { applyBodyConfig } from '../../../physics';
import { AbstractZone } from '../abstract-zone';

export class Zone3 extends AbstractZone {
  bg: Phaser.GameObjects.TileSprite;
  emitter: Phaser.GameObjects.Particles.ParticleEmitter;

  preload() {
    super.preload();
    this.load.image(Assets.images.zone3.key, Assets.images.zone3.path);
    this.load.spritesheet(Assets.spritesheets.snowflake.key, Assets.spritesheets.snowflake.path, {
      frameWidth: Assets.spritesheets.snowflake.frameWidth,
      frameHeight: Assets.spritesheets.snowflake.frameHeight,
    });
  }

  create() {
    this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'bg');
    this.bg.setOrigin(0, 0);
    this.bg.setScrollFactor(0);

    super.create();

    applyBodyConfig(this.player.body as Phaser.Physics.Arcade.Body, { dragX: 10 });
    this.createSnowFlakes();
  }

  createSnowFlakes() {
    this.emitter = this.add.particles(0, 0, Assets.spritesheets.snowflake.key, {
      x: this.scale.width / 2,
      y: 0,
      lifespan: 20000,
      frequency: 200,
      quantity: 1,
      scale: { min: 0.2, max: 1.5 },
      gravityY: 5,
      speedY: { min: 5, max: 20 },
      speedX: { min: -15, max: 15 },
      rotate: 0,
      emitZone: {
        type: 'random',
        source: new Phaser.Geom.Rectangle(0, 0, this.scale.width, 1),
      },
    });
  }

  update() {
    this.emitter.setPosition(this.scale.width / 2, this.cameras.main.scrollY);
    this.bg.tilePositionX = -this.player.x / 50;
  }
}
