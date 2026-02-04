import { Assets } from '../../../assets';
import { AbstractZone } from '../abstract-zone';

export class Zone3 extends AbstractZone {
  bg: Phaser.TileSprite;
  emitter: Phaser.Particles.Arcade.Emitter;

  preload() {
    super.preload();
    this.game.load.image(Assets.images.zone3.key, Assets.images.zone3.path);
    this.game.load.spritesheet(
      Assets.spritesheets.snowflake.key,
      Assets.spritesheets.snowflake.path,
      Assets.spritesheets.snowflake.frameWidth,
      Assets.spritesheets.snowflake.frameHeight,
    );
  }

  create() {
    this.bg = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bg');
    this.bg.fixedToCamera = true;

    super.create();

    this.player.body.drag.x = 10;
    this.createSnowFlakes();
  }

  createSnowFlakes() {
    this.emitter = this.game.add.emitter(this.game.world.centerX, 0, 100);

    this.emitter.width = this.game.world.width;

    this.emitter.makeParticles('snowflake');

    this.emitter.minParticleScale = 0.2;
    this.emitter.maxParticleScale = 1.5;
    this.emitter.gravity = 5;

    this.emitter.setYSpeed(5, 20);
    this.emitter.setXSpeed(-15, 15);

    this.emitter.minRotation = 0;
    this.emitter.maxRotation = 0;

    this.emitter.start(false, 20000, 200, 0);
  }

  update() {
    this.emitter.emitY = this.camera.y;

    super.update();

    this.bg.tilePosition.x = -this.player.x / 50;
  }
}
