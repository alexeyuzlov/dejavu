import type { Scene } from 'phaser';
import { GameObjects, Math as PhaserMath } from 'phaser';
import { TextureKey } from '../texture-keys';

export class PreloadBar extends GameObjects.Sprite {
  private fullWidth: number;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, TextureKey.PreloadBar);
    scene.add.existing(this);
    this.fullWidth = this.width;
  }

  setProgress(value: number) {
    const clamped = PhaserMath.Clamp(value, 0, 1);
    this.setDisplaySize(this.fullWidth * clamped, this.height);
  }
}
