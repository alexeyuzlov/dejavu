import { ArcadePrefab } from '../arcade-prefab';
import { Player } from '../player';
import type { TextureKeyValue } from '../../texture-keys';

export class AbstractEnemy extends ArcadePrefab {
  immortalState = false;
  immortalStateAt: number;
  immortalStateDuration = Phaser.Timer.SECOND / 3;
  defensePoints = 0;
  damagePoints = 0;

  constructor(game: Phaser.Game, x: number, y: number, texture: TextureKeyValue) {
    super(game, x, y, texture);
    this.alive = true;
    this.anchor.set(0, 0.5);

    this.immortalStateAt = game.time.now;
  }

  makeDamage(damagePoint: number) {
    if (!this.immortalState) {
      if (damagePoint < this.defensePoints) {
        damagePoint = 1;
      } else {
        damagePoint = damagePoint - this.defensePoints;
      }

      this.damage(damagePoint);

      const textStyle = {
        font: '20px Arial',
        fill: '#ffffff',
        stroke: '#0000ff',
        strokeThickness: 1,
      };

      const text = this.game.add.text(this.x, this.y, damagePoint.toString(), textStyle);
      const tween = this.game.add
        .tween(text)
        .to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);

      tween.onComplete.add(() => {
        text.destroy();
      });

      this.immortalStateAt = this.game.time.now;
      this.immortalState = true;
    }
  }

  update() {
    this.game.physics.arcade.overlap(
      this.level.player,
      this,
      (player: Player, enemy: AbstractEnemy) => {
        if (player.attackState) {
          enemy.makeDamage(player.damagePoints);
        } else {
          this.level.player.makeDamage(enemy.damagePoints);
        }
      },
    );

    if (this.immortalState && Date.now() - this.immortalStateAt > this.immortalStateDuration) {
      this.immortalState = false;
    }
  }
}
