import { AbstractZone } from '../state/levels/abstract-zone';

export class AbstractPrefab extends Phaser.GameObjects.Sprite {
  level: AbstractZone;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    this.level = scene as AbstractZone;

    scene.add.existing(this);
  }
}
