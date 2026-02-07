import { Bottle } from "./Bottle";
import { TextureKey } from "../../TextureKeys";

export class BottleHP extends Bottle {
    amount: number = 30;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, TextureKey.BottleHp);
        game.physics.arcade.enable(this);
    }

    makeAction() {
        this.level.player.getHP(this.amount);
    }
}
