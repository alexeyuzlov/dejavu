import { onKilled, onResume } from '../../events';
import { createGroup, getFirstDead, reviveAndReset } from '../../groups';
import { applyBodyConfig, overlapArcade, killSprite } from '../../physics';
import { BulletReject } from '../bullets/bullet-reject';
import { AbstractEnemy } from './abstract-enemy';

export class Boss extends AbstractEnemy {
  bossTweens: Phaser.GameObjects.Group;
  activeTweenID: number;

  lastEventAt: number;
  inAction = false;
  isProtect: boolean = true;
  health: number = 100;

  lastBulletShotAt: number;
  bullets: Phaser.GameObjects.Group;
  countBullets: number;
  shotDelay: number;
  damagePoints: number = 10;
  defensePoints: number = 40;

  lightningTexture: Phaser.Textures.CanvasTexture;
  lightning: Phaser.GameObjects.Image;
  flash: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene, bossTweens: Phaser.GameObjects.Group) {
    const tweenPoints = bossTweens.getChildren();
    const firstPoint = tweenPoints[0] as Phaser.GameObjects.Sprite;
    super(scene, firstPoint.x, firstPoint.y, 'boss');

    this.activeTweenID = 0;
    this.bossTweens = bossTweens;

    this.lastEventAt = this.scene.time.now;
    this.lastBulletShotAt = this.scene.time.now;
    this.countBullets = 10;
    this.shotDelay = 3 * 1000;

    this.bullets = createGroup(this.scene);
    for (var i = 0; i < this.countBullets; i++) {
      var bullet = new BulletReject(scene, 0, 0);
      this.bullets.add(bullet);
    }

    onResume(this.scene, (pauseDuration: number) => {
      this.lastBulletShotAt += pauseDuration;
    });

    const anims = this.scene.anims;
    if (!anims.exists('boss-move')) {
      anims.create({
        key: 'boss-move',
        frames: anims.generateFrameNames('boss', {
          prefix: 'boss-',
          start: 1,
          end: 4,
          suffix: '.png',
        }),
        frameRate: 20,
        repeat: -1,
      });
    }
    if (!anims.exists('boss-blue')) {
      anims.create({
        key: 'boss-blue',
        frames: anims.generateFrameNames('boss', {
          prefix: 'boss-blue-',
          start: 1,
          end: 4,
          suffix: '.png',
        }),
        frameRate: 20,
        repeat: -1,
      });
    }
    this.anims.play('boss-move');

    this.setOrigin(0.5, 1);

    this.lightningTexture = this.scene.textures.createCanvas('boss-lightning', 200, 1000);
    this.lightning = this.scene.add.image(this.scene.scale.width / 2, 0, 'boss-lightning');
    this.lightning.setOrigin(0.5, 0);
    this.lightning.setScrollFactor(0);
    this.lightning.setAlpha(0);
    this.lightning.setDepth(999);

    this.flash = this.scene.add.rectangle(
      0,
      0,
      this.scene.scale.width,
      this.scene.scale.height,
      0xffffff,
      1,
    );
    this.flash.setOrigin(0, 0);
    this.flash.setScrollFactor(0);
    this.flash.setAlpha(0);
    this.flash.setDepth(1000);

    onKilled(this, () => {
      this.boom();

      this.scene.tweens.add({
        targets: this.level.blackScreen,
        alpha: 1,
        duration: 3 * 1000,
        ease: 'Linear',
        onComplete: () => {
          this.level.startNextLevel();
        },
      });
    });
  }

  generateAction() {
    this.lastEventAt = this.scene.time.now;

    do {
      var rand = Math.floor(Math.random() * this.bossTweens.getChildren().length);
    } while (rand == this.activeTweenID);
    this.activeTweenID = rand;

    const target = this.bossTweens.getChildren()[this.activeTweenID] as Phaser.GameObjects.Sprite;
    this.scene.tweens.add({
      targets: this,
      x: target.x,
      y: target.y,
      duration: Math.random() * 1000 + 2000,
      ease: 'Quadratic.In',
      onComplete: () => {
        this.inAction = false;
      },
    });
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    if (!this.active) return;

    overlapArcade(this.scene, this, this.bullets, (shooterReject: any, bulletReject: any) => {
      if (bulletReject.rejectState) {
        killSprite(bulletReject);
        this.anims.play('boss-blue');
        this.isProtect = false;
      }
    });

    overlapArcade(this.scene, this.level.player, this, (player: any, enemy: any) => {
      if (player.attackState) {
        if (this.isProtect) {
          this.makeDamage(1);
        } else {
          this.makeDamage(player.damagePoints);
          this.isProtect = true;
          this.anims.play('boss-move');
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

    if (this.scene.time.now - this.lastBulletShotAt < this.shotDelay) return;
    this.lastBulletShotAt = this.scene.time.now;

    var bullet = getFirstDead<BulletReject>(this.bullets);

    if (bullet === null || bullet === undefined) return;

    reviveAndReset(bullet, this.x, this.y);
    bullet.rejectState = false;

    if (this.x > this.level.player.x) {
      applyBodyConfig(bullet.body as Phaser.Physics.Arcade.Body, { velocityX: -bullet.speed });
      bullet.scaleX = -1;
      this.scaleX = -1;
    } else {
      applyBodyConfig(bullet.body as Phaser.Physics.Arcade.Body, { velocityX: bullet.speed });
      bullet.scaleX = 1;
      this.scaleX = 1;
    }

    if (
      this.immortalState &&
      this.scene.time.now - this.immortalStateAt > this.immortalStateDuration
    ) {
      this.immortalState = false;
    }
  }

  boom() {
    // Rotate the lightning sprite so it goes in the
    // direction of the pointer
    this.lightning.rotation =
      Phaser.Math.Angle.Between(this.lightning.x, this.lightning.y, this.x, this.y) - Math.PI / 2;

    // Calculate the distance from the lightning source to the pointer
    const distance = Phaser.Math.Distance.Between(this.lightning.x, this.lightning.y, this.x, this.y);

    // Create the lightning texture
    this.createLightningTexture(this.lightningTexture.width / 2, 0, 100, 3, false, distance);

    // Make the lightning sprite visible
    this.lightning.setAlpha(1);

    // Fade out the lightning sprite using a tween on the alpha property.
    // Check out the "Easing function" examples for more info.
    this.scene.tweens.add({
      targets: this.lightning,
      alpha: 0.5,
      duration: 100,
      ease: 'Bounce.Out',
      yoyo: true,
      repeat: 3,
      onComplete: () => {
        this.scene.tweens.add({
          targets: this.lightning,
          alpha: 0,
          duration: 250,
          ease: 'Cubic.In',
        });
      },
    });

    // Create the flash
    this.flash.setAlpha(1);
    this.scene.tweens.add({
      targets: this.flash,
      alpha: 0,
      duration: 100,
      ease: 'Cubic.In',
    });
  }

  createLightningTexture(
    x: any,
    y: any,
    segments: any,
    boltWidth: any,
    branch: any,
    distance: any,
  ) {
    // Get the canvas drawing context for the lightningBitmap
    const ctx = this.lightningTexture.context;
    const width = this.lightningTexture.width;
    const height = this.lightningTexture.height;

    // Our lightning will be made up of several line segments starting at
    // the center of the top edge of the bitmap and ending at the target.

    // Clear the canvas
    if (!branch) ctx.clearRect(0, 0, width, height);

    // Draw each of the segments
    for (var i = 0; i < segments; i++) {
      // Set the lightning color and bolt width
      ctx.strokeStyle = 'rgb(255, 255, 255)';
      ctx.lineWidth = boltWidth;

      ctx.beginPath();
      ctx.moveTo(x, y);

      // Calculate an x offset from the end of the last line segment and
      // keep it within the bounds of the bitmap
      if (branch) {
        // For a branch
        x += Phaser.Math.Between(-10, 10);
      } else {
        // For the main bolt
        x += Phaser.Math.Between(-30, 30);
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
        y += Phaser.Math.Between(10, 20);
      } else {
        // For the main bolt
        y += Phaser.Math.Between(20, Math.floor(distance / segments));
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
        if (Phaser.Math.Between(1, 100) <= 20) {
          // Draws another, thinner, bolt starting from this position
          this.createLightningTexture(x, y, 10, 1, true, distance);
        }
      }
    }

    // This just tells the engine it should update the texture cache
    this.lightningTexture.refresh();
  }
}
