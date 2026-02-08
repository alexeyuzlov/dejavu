import type { Scene } from 'phaser';
import { GameObjects } from 'phaser';
import type { AbstractZone } from '../state/levels/abstract-zone';
import { TextureKey } from '../texture-keys';

export class HUD extends GameObjects.Container {
  level: AbstractZone;
  private healthState: GameObjects.Text;

  alpha = 0;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    this.level = scene as AbstractZone;

    const font = {
      font: '13px Arial',
      fill: '#ffffff',
    };

    const hudSprite = scene.add.image(0, 0, TextureKey.Hud);

    this.healthState = scene.add.text(14, 1, '', font);

    this.add([hudSprite, this.healthState]);
    this.setScrollFactor(0);
    this.setDepth(100);
    scene.add.existing(this);
    this.updateHealthState();
  }

  updateHealthState() {
    this.healthState.setText(this.level.player.health.toString());
  }
}
