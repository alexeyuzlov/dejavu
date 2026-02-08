import type { Scene } from 'phaser';
import type { TextureKeyValue } from '../../texture-keys';
import { ArcadePrefab } from '../arcade-prefab';
import { Player } from '../player';

export class AbstractEnemy extends ArcadePrefab {
  immortalState = false;
  immortalStateAt: number;
  immortalStateDuration = 1000 / 3;
  defensePoints = 0;
  damagePoints = 0;

  constructor(scene: Scene, x: number, y: number, texture: TextureKeyValue) {
    super(scene, x, y, texture);
    this.setActive(true);

    this.immortalStateAt = this.scene.time.now;

    this.scene.physics.add.overlap(
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

      const text = this.scene.add.text(this.x, this.y, damagePoint.toString(), textStyle);
      this.scene.tweens.add({
        targets: text,
        alpha: 0,
        duration: 1000,
        ease: 'Linear',
        onComplete: () => {
          text.destroy();
        },
      });

      this.immortalStateAt = this.scene.time.now;
      this.immortalState = true;
    }
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    if (
      this.immortalState &&
      this.scene.time.now - this.immortalStateAt > this.immortalStateDuration
    ) {
      this.immortalState = false;
    }
  }
}
