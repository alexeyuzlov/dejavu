import { Bottle } from "./Bottle";

export class BottleHP extends Bottle {
    amount: number = 30;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "bottle-hp");
        game.physics.arcade.enable(this);
    }

    makeAction() {
        this.level.player.getHP(this.amount);
    }
}
