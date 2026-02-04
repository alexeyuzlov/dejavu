import { applyBodyConfig, collideArcade, enableArcade } from '../physics';
import { AbstractPrefab } from './abstract-prefab';

export class Exit extends AbstractPrefab {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'exit');
    enableArcade(game, this);

    applyBodyConfig(this.body, { immovable: true });
  }

  update() {
    collideArcade(
      this.game,
      this.level.player,
      this.level.exits,
      (player: any, exit: any) => {
        this.level.startNextLevel();
      },
    );
  }
}
