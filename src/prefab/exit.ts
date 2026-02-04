import { applyBodyConfig, collideArcade, enableArcade } from '../physics';
import { AbstractPrefab } from './abstract-prefab';

export class Exit extends AbstractPrefab {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'exit');
    enableArcade(scene, this);

    applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { immovable: true });
  }

  update() {
    collideArcade(
      this.scene,
      this.level.player,
      this.level.exits,
      (player: any, exit: any) => {
        this.level.startNextLevel();
      },
    );
  }
}
