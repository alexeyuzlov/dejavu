import { AbstractPrefab } from "../AbstractPrefab";

export class Bullet extends AbstractPrefab {
  speed: number = 300;
  damagePoints: number = 20;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, "bullet");

    game.physics.arcade.enable(this);
    this.anchor.set(0.5, 0.5);
    this.kill();

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
  }

  update() {
    this.game.physics.arcade.collide(this, this.level.player, (bullet: any, player: any) => {
      bullet.kill();
      if (!this.level.player.immortalState) {
        this.level.player.makeDamage(bullet.damagePoints);
        this.level.hud.updateHealthState();
      }
    });
  }
}