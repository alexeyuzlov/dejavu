import { TextureKey } from "../../TextureKeys";
import { AbstractEnemy } from "./AbstractEnemy";

export class Flier extends AbstractEnemy {
    isActive: boolean = false;
    minDistance: number;
    damagePoints: number = 10;
    speed: number = 150;
    defensePoints: number = 7;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, TextureKey.Flier);

        this.anchor.set(0.5, 0.5);
        this.health = 84;

        this.minDistance = this.level.player.width / 2;
        this.isActive = true;

        this.animations.add(
            "fly",
            Phaser.Animation.generateFrameNames("flier-", 1, 4, ".png", 0),
            20,
            true
        );
        this.animations.play("fly");
    }

    update() {
        super.update();

        if (!this.inCamera || !this.alive) {
            this.body.velocity.setTo(0, 0);
            return;
        }

        var distance = Phaser.Math.distance(
            this.x,
            this.y,
            this.level.player.x,
            this.level.player.y
        );

        if (distance > this.minDistance) {
            var rotation = Phaser.Math.angleBetween(
                this.x,
                this.y,
                this.level.player.x,
                this.level.player.y
            );

            this.body.velocity.x = Math.cos(rotation) * this.speed;
            this.body.velocity.y = Math.sin(rotation) * this.speed;
        } else {
            this.body.velocity.setTo(0, 0);
        }
    }
}
