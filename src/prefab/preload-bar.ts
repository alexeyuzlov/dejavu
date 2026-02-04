import { AbstractPrefab } from './abstract-prefab';

export class PreloadBar extends AbstractPrefab {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'preload-bar');

    this.setOrigin(1, 1);
  }
}
