import type { Cameras, Scene } from 'phaser';
import { Geom } from 'phaser';
import { TextureKey } from '../texture-keys';

export class RainEffect {
  static textureKey = TextureKey.Rain;

  static preload(scene: Scene) {
    scene.load.image(this.textureKey, 'assets/images/rain.png');
  }

  private emitBounds: Geom.Rectangle;

  constructor(scene: Scene, camera: Cameras.Scene2D.Camera) {
    const width = camera.worldView.width;
    const height = camera.worldView.height;

    this.emitBounds = new Geom.Rectangle(
      camera.worldView.x - width * 0.1,
      camera.worldView.y - height * 0.2,
      width * 1.5,
      height * 1.5,
    );

    scene.add.particles(0, 0, RainEffect.textureKey, {
      emitZone: { type: 'random', source: this.emitBounds },
      speedY: { min: 220, max: 300 },
      speedX: { min: -5, max: 5 },
      scale: { start: 0.35, end: 0.9 },
      angle: 20,
      rotate: 0,
      lifespan: 3000,
      frequency: 50,
      quantity: 1,
    });
  }

  update(camera: Cameras.Scene2D.Camera) {
    this.emitBounds.x = camera.worldView.x - camera.worldView.width * 0.1;
    this.emitBounds.y = camera.worldView.y - camera.worldView.height * 0.2;
    this.emitBounds.width = camera.worldView.width * 1.2;
    this.emitBounds.height = camera.worldView.height * 1.2;
  }
}
