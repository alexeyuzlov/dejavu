import { ArcadePrefab } from "./ArcadePrefab";
import type { Player } from "./Player";

export class Spike extends ArcadePrefab {
    damagePoints: number = 10;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "spike");

        game.physics.arcade.enable(this);

        this.body.immovable = true;
    }

    update() {
        this.game.physics.arcade.collide(
            this.level.player,
            this,
            (_player: Player, spike: Spike) => {
                if (!this.level.player.immortalState) {
                    this.level.player.makeDamage(spike.damagePoints);
                    this.level.hud.updateHealthState();
                }
            }
        );
    }
}
