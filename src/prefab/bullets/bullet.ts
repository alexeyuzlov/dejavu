import { ArcadePrefab } from "../ArcadePrefab";
import type { Player } from "../Player";
import { TextureKey } from "../../TextureKeys";

export class Bullet extends ArcadePrefab {
    speed: number = 300;
    damagePoints: number = 20;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, TextureKey.Bullet);

        game.physics.arcade.enable(this);
        this.anchor.set(0.5, 0.5);
        this.kill();

        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
    }

    update() {
        this.game.physics.arcade.collide(
            this,
            this.level.player,
            (bullet: Bullet, _player: Player) => {
                bullet.kill();
                if (!this.level.player.immortalState) {
                    this.level.player.makeDamage(bullet.damagePoints);
                    this.level.hud.updateHealthState();
                }
            }
        );
    }
}
