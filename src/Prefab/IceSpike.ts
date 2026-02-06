import { TextureKey } from "../TextureKeys";
import { ArcadePrefab } from "./ArcadePrefab";
import type { Player } from "./Player";

export class IceSpike extends ArcadePrefab {
    damagePoints: number = 10;
    distanceToTarget: number = Math.random() * 100 - 40; // from - 40 to 60 px to target

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, TextureKey.IceSpike);
        game.physics.arcade.enable(this);

        this.checkWorldBounds = true;
    }

    update() {
        this.game.physics.arcade.overlap(
            this.level.player,
            this,
            (_player: Player, iceSpike: IceSpike) => {
                if (!this.level.player.immortalState) {
                    this.level.player.makeDamage(iceSpike.damagePoints);
                    this.level.hud.updateHealthState();
                }
            }
        );

        if (!this.inCamera) return;

        if (
            Math.abs(this.level.player.x - this.body.x) < this.distanceToTarget &&
            this.level.player.y > this.body.y
        ) {
            this.body.gravity.y = 100;
            this.body.acceleration.y = 1000;
        }

        if (this.y > this.game.world.height) {
            this.kill();
        }
    }
}
