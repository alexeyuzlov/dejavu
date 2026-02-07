import { Bullet } from "../bullets/bullet";
import { TextureKey } from "../../texture-keys";
import { AbstractEnemy } from "./abstract-enemy";

export class Shooter extends AbstractEnemy {
    gravity = 300;
    lastBulletShotAt: number;
    bullets: Phaser.Group;
    countBullets = 10;
    shotDelay = Phaser.Timer.SECOND * 3;
    damagePoints = 10;
    defensePoints = 5;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, TextureKey.Shooter);

        this.body.gravity.y = this.gravity;
        this.lastBulletShotAt = this.game.time.now;

        this.bullets = this.game.add.group();
        for (let i = 0; i < this.countBullets; i++) {
            const bullet = new Bullet(game, 0, 0);
            this.bullets.add(bullet);
        }
        this.health = 100;

        this.game.onResume.add(() => {
            this.lastBulletShotAt += this.game.time.pauseDuration;
        });

        this.animations.add("stay", ["shooter-stay-1.png"], 10, true);
        this.animations.add("shot", ["shooter-shot-1.png"], 10, true);
        this.animations.play("stay");
        this.anchor.set(0.5, 0.5);
    }

    update() {
        super.update();

        this.game.physics.arcade.collide(this, this.level.layer);

        if (!this.inCamera || !this.alive) {
            this.body.velocity.setTo(0, 0);
            return;
        }

        if (this.game.time.now - this.lastBulletShotAt < Phaser.Timer.SECOND / 4) {
            this.animations.play("shot");
        } else {
            this.animations.play("stay");
        }

        if (this.game.time.now - this.lastBulletShotAt < this.shotDelay) return;
        this.lastBulletShotAt = this.game.time.now;

        const bullet = this.bullets.getFirstDead();

        if (bullet === null || bullet === undefined) return;

        bullet.revive();
        bullet.reset(this.x, this.y);

        if (this.x > this.level.player.x) {
            this.scale.x = -1;
            bullet.scale.x = -1;
            bullet.body.velocity.x = -bullet.speed;
        } else {
            this.scale.x = 1;
            bullet.scale.x = 1;
            bullet.body.velocity.x = bullet.speed;
        }
    }
}
