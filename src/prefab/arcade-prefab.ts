import type { Scene } from 'phaser';
import { Physics } from 'phaser';
import type { AbstractZone } from '../state/levels/abstract-zone';
export class ArcadePrefab extends Physics.Arcade.Sprite {
  level: AbstractZone;
  health = 1;
  body: Physics.Arcade.Body;

  constructor(scene: Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.level = scene as AbstractZone;
    // this.setOrigin(0, 0);
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  kill() {
    this.setActive(false);
    this.setVisible(false);
    this.body.enable = false;
  }

  revive() {
    this.setActive(true);
    this.setVisible(true);
    this.body.enable = true;
  }

  reset(x: number, y: number) {
    this.setPosition(x, y);
    this.revive();
  }

  damage(amount: number) {
    this.health -= amount;
    if (this.health <= 0) {
      this.kill();
      this.emit('killed');
    }
  }
}
