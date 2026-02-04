import { AbstractZone } from '../state/levels/abstract-zone';

export class HUD extends Phaser.GameObjects.Container {
  level: AbstractZone;
  background: Phaser.GameObjects.Image;
  healthState: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);

    this.level = scene as AbstractZone;

    const font = {
      font: '13px Arial',
      fill: '#ffffff',
    };

    this.background = scene.add.image(0, 0, 'hud');
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(0);

    this.healthState = scene.add.text(14, 1, '', font);
    this.healthState.setScrollFactor(0);
    this.updateHealthState();

    this.add([this.background, this.healthState]);
    this.setScrollFactor(0);
  }

  updateHealthState() {
    this.healthState.setText(this.level.player.health.toString());
  }

  update() {}
}
