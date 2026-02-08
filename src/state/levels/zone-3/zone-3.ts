import type { GameObjects } from 'phaser';
import { TextureKey } from '../../../texture-keys';
import { AbstractZone } from '../abstract-zone';

export class Zone3 extends AbstractZone {
  emitter?: GameObjects.Particles.ParticleEmitter;

  preload() {
    super.preload();
    this.load.image(this.bgKey, 'assets/images/zone3.png');
    this.load.spritesheet(TextureKey.Snowflake, 'assets/images/snowflake.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    super.create();

    this.player.body.setDragX(10);
    this.createSnowFlakes();
  }

  createSnowFlakes() {
    const width = Number(this.sys.game.config.width);
    this.emitter = this.add.particles(0, 0, TextureKey.Snowflake, {
      x: { min: 0, max: width },
      y: 0,
      speedY: { min: 5, max: 20 },
      speedX: { min: -15, max: 15 },
      scale: { start: 0.2, end: 1.5 },
      gravityY: 5,
      lifespan: 20000,
      frequency: 200,
      quantity: 1,
    });
  }

  update(time: number, delta: number) {
    if (this.emitter) {
      this.emitter.setPosition(this.scale.width / 2, this.cameras.main.scrollY);
    }

    super.update(time, delta);

    this.bg.tilePositionX = -this.player.x / 50;
  }
}
