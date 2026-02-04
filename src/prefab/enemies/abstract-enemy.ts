import { overlapArcade, killSprite } from '../../physics';
import { timeNow, secondsToMs } from '../../time';
import { AbstractPrefab } from '../abstract-prefab';

export class AbstractEnemy extends AbstractPrefab {
  health: number = 0;
  immortalState: boolean;
  immortalStateAt: number;
  immortalStateDuration: number;
  defensePoints: number = 0;
  damagePoints: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string) {
    super(scene, x, y, sprite);

    this.setActive(true);
    this.setOrigin(0, 0.5);

    this.immortalState = false;
    this.immortalStateAt = timeNow(scene);
    this.immortalStateDuration = secondsToMs(1 / 3);
    this.defensePoints = 0;
  }

  makeDamage(damagePoint: any) {
    if (!this.immortalState) {
      if (damagePoint < this.defensePoints) {
        damagePoint = 1;
      } else {
        damagePoint = damagePoint - this.defensePoints;
      }

      this.health = (this.health ?? 0) - damagePoint;
      if (this.health <= 0) {
        killSprite(this);
      }

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
        duration: secondsToMs(1),
        ease: 'Linear',
        onComplete: () => {
          text.destroy();
        },
      });

      this.immortalStateAt = timeNow(this.scene);
      this.immortalState = true;
    }
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    overlapArcade(this.scene, this.level.player, this, (player: any, enemy: any) => {
      if (player.attackState) {
        enemy.makeDamage(player.damagePoints);
      } else if (!this.level.player.immortalState) {
        this.level.player.makeDamage(enemy.damagePoints);
        this.level.hud.updateHealthState();
      }
    });

    if (this.immortalState && timeNow(this.scene) - this.immortalStateAt > this.immortalStateDuration) {
      this.immortalState = false;
    }
  }
}
