import { AbstractPrefab } from "../AbstractPrefab";

export class AbstractEnemy extends AbstractPrefab {
  immortalState: boolean;
  immortalStateAt: number;
  immortalStateDuration: number;
  defensePoints: number = 0;
  damagePoints: number = 0;

  constructor(game: Phaser.Game, x: number, y: number, sprite: string) {
    super(game, x, y, sprite);

    game.physics.arcade.enable(this);
    this.alive = true;
    this.anchor.set(0, 0.5);

    this.immortalState = false;
    this.immortalStateAt = game.time.now;
    this.immortalStateDuration = Phaser.Timer.SECOND / 3;
    this.defensePoints = 0;
  }

  makeDamage(damagePoint: any) {
    if (!this.immortalState) {
      if (damagePoint < this.defensePoints) {
        damagePoint = 1;
      } else {
        damagePoint = damagePoint - this.defensePoints;
      }

      this.damage(damagePoint);

      var textStyle = {
        font: "20px Arial",
        fill: "#ffffff",
        stroke: "#0000ff",
        strokeThickness: 1,
      };

      var text = this.game.add.text(this.x, this.y, damagePoint.toString(), textStyle);
      var tween = this.game.add
        .tween(text)
        .to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);

      tween.onComplete.add(() => {
        text.destroy();
      });

      this.immortalStateAt = Date.now();
      this.immortalState = true;
    }
  }

  update() {
    this.game.physics.arcade.overlap(this.level.player, this, (player: any, enemy: any) => {
      if (player.attackState) {
        enemy.makeDamage(player.damagePoints);
      } else if (!this.level.player.immortalState) {
        this.level.player.makeDamage(enemy.damagePoints);
        this.level.hud.updateHealthState();
      }
    });

    if (this.immortalState && Date.now() - this.immortalStateAt > this.immortalStateDuration) {
      this.immortalState = false;
    }
  }
}