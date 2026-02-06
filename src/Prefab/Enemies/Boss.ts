import { BulletReject } from "../Bullets/BulletReject";
import { AbstractEnemy } from "./AbstractEnemy";

export class Boss extends AbstractEnemy {
    bossTweens: Phaser.Group;
    activeTweenID: number;

    lastEventAt: number;
    inAction = false;
    isProtect: boolean = true;
    health: number = 100;

    lastBulletShotAt: number;
    bullets: Phaser.Group;
    countBullets: number;
    shotDelay: number;
    damagePoints: number = 10;
    defensePoints: number = 40;

    lightningBitmap: Phaser.BitmapData;
    lightning: Phaser.Image;
    flash: Phaser.Graphics;

    constructor(game: Phaser.Game, bossTweens: Phaser.Group) {
        super(game, bossTweens.children[0].x, bossTweens.children[0].y, "boss");

        this.activeTweenID = 0;
        this.bossTweens = bossTweens;

        this.lastEventAt = this.game.time.now;
        this.lastBulletShotAt = this.game.time.now;
        this.countBullets = 10;
        this.shotDelay = Phaser.Timer.SECOND * 3;

        this.bullets = this.game.add.group();
        for (var i = 0; i < this.countBullets; i++) {
            var bullet = new BulletReject(game, 0, 0);
            this.bullets.add(bullet);
        }

        this.game.onResume.add(() => {
            this.lastBulletShotAt += this.game.time.pauseDuration;
        });

        this.animations.add(
            "move",
            Phaser.Animation.generateFrameNames("boss-", 1, 4, ".png", 0),
            20,
            true
        );
        this.animations.add(
            "blue",
            Phaser.Animation.generateFrameNames("boss-blue-", 1, 4, ".png", 0),
            20,
            true
        );
        this.animations.play("move");

        this.anchor.set(0.5, 1);

        this.lightningBitmap = this.game.add.bitmapData(200, 1000);
        this.lightning = this.game.add.image(this.game.width / 2, 0, this.lightningBitmap);
        this.lightning.anchor.setTo(0.5, 0);
        this.lightning.fixedToCamera = true;

        this.flash = this.game.add.graphics(0, 0);
        this.flash.beginFill(0xffffff, 1);
        this.flash.drawRect(0, 0, this.game.width, this.game.height);
        this.flash.endFill();
        this.flash.alpha = 0;
        this.flash.fixedToCamera = true;

        this.events.onKilled.add(() => {
            this.boom();

            this.game.add
                .tween(this.level.blackScreen)
                .to({ alpha: 1 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true)
                .onComplete.add(() => {
                    this.level.startNextLevel();
                });
        });
    }

    generateAction() {
        this.lastEventAt = this.game.time.now;

        do {
            var rand = Math.floor(Math.random() * this.bossTweens.children.length);
        } while (rand == this.activeTweenID);
        this.activeTweenID = rand;

        var tween = this.game.add.tween(this);
        tween.to(
            {
                x: this.bossTweens.children[this.activeTweenID].x,
                y: this.bossTweens.children[this.activeTweenID].y,
            },
            Math.random() * 1000 + 2000,
            Phaser.Easing.Quadratic.In,
            true,
            0,
            0,
            false
        );

        tween.onComplete.add(() => {
            this.inAction = false;
        });
    }

    update() {
        if (!this.alive) return;

        this.game.physics.arcade.overlap(this, this.bullets, (shooterReject, bulletReject) => {
            if (bulletReject.rejectState) {
                bulletReject.kill();
                this.animations.play("blue");
                this.isProtect = false;
            }
        });

        this.game.physics.arcade.overlap(this.level.player, this, (player, enemy) => {
            if (player.attackState) {
                if (this.isProtect) {
                    this.makeDamage(1);
                } else {
                    this.makeDamage(player.damagePoints);
                    this.isProtect = true;
                    this.animations.play("move");
                }
            } else if (!this.level.player.immortalState) {
                this.level.player.makeDamage(enemy.damagePoints);
                this.level.hud.updateHealthState();
            }
        });

        if (!this.inAction) {
            this.inAction = true;
            this.generateAction();
        }

        if (this.game.time.now - this.lastBulletShotAt < this.shotDelay) return;
        this.lastBulletShotAt = this.game.time.now;

        var bullet = this.bullets.getFirstDead();

        if (bullet === null || bullet === undefined) return;

        bullet.revive();
        bullet.reset(this.x, this.y);
        bullet.rejectState = false;

        if (this.x > this.level.player.x) {
            bullet.body.velocity.x = -bullet.speed;
            bullet.scale.x = -1;
            this.scale.x = -1;
        } else {
            bullet.body.velocity.x = bullet.speed;
            bullet.scale.x = 1;
            this.scale.x = 1;
        }

        if (this.immortalState && Date.now() - this.immortalStateAt > this.immortalStateDuration) {
            this.immortalState = false;
        }
    }

    boom() {
        // Rotate the lightning sprite so it goes in the
        // direction of the pointer
        this.lightning.rotation =
            Phaser.Math.angleBetween(this.lightning.x, this.lightning.y, this.x, this.y) -
            Math.PI / 2;

        // Calculate the distance from the lightning source to the pointer
        var distance = Phaser.Math.distance(this.lightning.x, this.lightning.y, this.x, this.y);

        // Create the lightning texture
        this.createLightningTexture(this.lightningBitmap.width / 2, 0, 100, 3, false, distance);

        // Make the lightning sprite visible
        this.lightning.alpha = 1;

        // Fade out the lightning sprite using a tween on the alpha property.
        // Check out the "Easing function" examples for more info.
        this.game.add
            .tween(this.lightning)
            .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
            .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
            .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
            .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
            .to({ alpha: 0 }, 250, Phaser.Easing.Cubic.In)
            .start();

        // Create the flash
        this.flash.alpha = 1;
        this.game.add.tween(this.flash).to({ alpha: 0 }, 100, Phaser.Easing.Cubic.In).start();
    }

    createLightningTexture(
        x: number,
        y: number,
        segments: number,
        boltWidth: number,
        branch: boolean,
        distance: number
    ) {
        // Get the canvas drawing context for the lightningBitmap
        var ctx = this.lightningBitmap.context;
        var width = this.lightningBitmap.width;
        var height = this.lightningBitmap.height;

        // Our lightning will be made up of several line segments starting at
        // the center of the top edge of the bitmap and ending at the target.

        // Clear the canvas
        if (!branch) ctx.clearRect(0, 0, width, height);

        // Draw each of the segments
        for (var i = 0; i < segments; i++) {
            // Set the lightning color and bolt width
            ctx.strokeStyle = "rgb(255, 255, 255)";
            ctx.lineWidth = boltWidth;

            ctx.beginPath();
            ctx.moveTo(x, y);

            // Calculate an x offset from the end of the last line segment and
            // keep it within the bounds of the bitmap
            if (branch) {
                // For a branch
                x += this.game.rnd.integerInRange(-10, 10);
            } else {
                // For the main bolt
                x += this.game.rnd.integerInRange(-30, 30);
            }
            if (x <= 10) x = 10;
            if (x >= width - 10) x = width - 10;

            // Calculate a y offset from the end of the last line segment.
            // When we've reached the target or there are no more segments left,
            // set the y position to the distance to the target. For branches, we
            // don't care if they reach the target so don't set the last coordinate
            // to the target if it's hanging in the air.
            if (branch) {
                // For a branch
                y += this.game.rnd.integerInRange(10, 20);
            } else {
                // For the main bolt
                y += this.game.rnd.integerInRange(20, distance / segments);
            }
            if ((!branch && i == segments - 1) || y > distance) {
                // This causes the bolt to always terminate at the center
                // lightning bolt bounding box at the correct distance to
                // the target. Because of the way the lightning sprite is
                // rotated, this causes this point to be exactly where the
                // player clicked or tapped.
                y = distance;
                if (!branch) x = width / 2;
            }

            // Draw the line segment
            ctx.lineTo(x, y);
            ctx.stroke();

            // Quit when we've reached the target
            if (y >= distance) break;

            // Draw a branch 20% of the time off the main bolt only
            if (!branch) {
                if (Phaser.Utils.chanceRoll(20)) {
                    // Draws another, thinner, bolt starting from this position
                    this.createLightningTexture(x, y, 10, 1, true, distance);
                }
            }
        }

        // This just tells the engine it should update the texture cache
        this.lightningBitmap.dirty = true;
    }
}
