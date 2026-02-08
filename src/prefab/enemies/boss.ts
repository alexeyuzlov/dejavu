import type { GameObjects, Scene, Textures } from 'phaser';
import { Math as PhaserMath } from 'phaser';
import { TextureKey } from '../../texture-keys';
import { BulletReject } from '../bullets/bullet-reject';
import { Player } from '../player';
import { AbstractEnemy } from './abstract-enemy';

export class Boss extends AbstractEnemy {
  bossTweens: GameObjects.Group;
  activeTweenID = 0;

  lastEventAt: number;
  inAction = false;
  isProtect = true;
  health = 100;

  lastBulletShotAt: number;
  bullets: GameObjects.Group;
  countBullets = 10;
  shotDelay = 3000;
  damagePoints = 10;
  defensePoints = 40;

  lightningTexture: Textures.CanvasTexture;
  lightning: GameObjects.Image;
  flash: GameObjects.Rectangle;

  constructor(scene: Scene, bossTweens: GameObjects.Group) {
    const startPoint = bossTweens.getChildren()[0] as GameObjects.Sprite;
    super(scene, startPoint.x, startPoint.y, TextureKey.Boss);

    this.bossTweens = bossTweens;
    this.body.setAllowGravity(false);

    this.lastEventAt = this.scene.time.now;
    this.lastBulletShotAt = this.scene.time.now;

    this.bullets = this.scene.add.group();
    this.bullets.runChildUpdate = true;
    for (let i = 0; i < this.countBullets; i++) {
      const bullet = new BulletReject(scene, 0, 0);
      this.bullets.add(bullet);
    }

    this.scene.physics.add.collider(this, this.level.layer);
    this.scene.physics.add.overlap(this, this.bullets, (_boss, bulletReject) => {
      const activeBullet = bulletReject as BulletReject;
      if (activeBullet.rejectState) {
        activeBullet.kill();
        this.play('boss-blue', true);
        this.isProtect = false;
      }
    });

    this.scene.physics.add.overlap(this.level.player, this, (player: Player, boss: Boss) => {
      if (player.attackState) {
        if (this.isProtect) {
          this.makeDamage(1);
        } else {
          this.makeDamage(player.damagePoints);
          this.isProtect = true;
          this.play('boss-move', true);
        }
      } else {
        this.level.player.makeDamage(boss.damagePoints);
      }
    });

    if (!this.scene.anims.exists('boss-move')) {
      this.scene.anims.create({
        key: 'boss-move',
        frames: this.scene.anims.generateFrameNames(TextureKey.Boss, {
          prefix: 'boss-',
          start: 1,
          end: 4,
          suffix: '.png',
        }),
        frameRate: 20,
        repeat: -1,
      });
    }
    if (!this.scene.anims.exists('boss-blue')) {
      this.scene.anims.create({
        key: 'boss-blue',
        frames: this.scene.anims.generateFrameNames(TextureKey.Boss, {
          prefix: 'boss-blue-',
          start: 1,
          end: 4,
          suffix: '.png',
        }),
        frameRate: 20,
        repeat: -1,
      });
    }
    this.play('boss-move', true);

    this.setOrigin(0.5, 1);

    if (!this.scene.textures.exists('boss-lightning')) {
      this.lightningTexture = this.scene.textures.createCanvas('boss-lightning', 200, 1000);
    } else {
      this.lightningTexture = this.scene.textures.get('boss-lightning') as Textures.CanvasTexture;
    }
    this.lightning = this.scene.add.image(this.scene.scale.width / 2, 0, 'boss-lightning');
    this.lightning.setOrigin(0.5, 0);
    this.lightning.setScrollFactor(0);

    this.flash = this.scene.add.rectangle(
      0,
      0,
      this.scene.scale.width,
      this.scene.scale.height,
      0xffffff,
      1,
    );
    this.flash.setOrigin(0, 0);
    this.flash.setAlpha(0);
    this.flash.setScrollFactor(0);

    this.on('killed', () => {
      this.boom();

      this.scene.tweens.add({
        targets: this.level.blackScreen,
        alpha: 1,
        duration: 3000,
        ease: 'Linear',
        onComplete: () => {
          this.level.startNextLevel();
        },
      });
    });
  }

  generateAction() {
    this.lastEventAt = this.scene.time.now;

    if (this.bossTweens.getChildren().length < 2) {
      this.inAction = false;
      return;
    }

    let rand = this.activeTweenID;
    do {
      rand = Math.floor(Math.random() * this.bossTweens.getChildren().length);
    } while (rand == this.activeTweenID);
    this.activeTweenID = rand;

    const target = this.bossTweens.getChildren()[this.activeTweenID] as GameObjects.Sprite;
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

    if (
      this.immortalState &&
      this.scene.time.now - this.immortalStateAt > this.immortalStateDuration
    ) {
      this.immortalState = false;
    }

    if (!this.inAction) {
      this.inAction = true;
      this.generateAction();
    }

    if (this.scene.time.now - this.lastBulletShotAt < this.shotDelay) return;
    this.lastBulletShotAt = this.scene.time.now;

    const bullet = this.bullets.getFirstDead(false) as BulletReject | null;

    if (bullet === null || bullet === undefined) return;

    bullet.revive();
    bullet.reset(this.x, this.y);
    bullet.rejectState = false;

    if (this.x > this.level.player.x) {
      bullet.body.setVelocityX(-bullet.speed);
      bullet.setFlipX(true);
      this.setFlipX(true);
    } else {
      bullet.body.setVelocityX(bullet.speed);
      bullet.setFlipX(false);
      this.setFlipX(false);
    }
  }

  boom() {
    // Rotate the lightning sprite so it goes in the
    // direction of the pointer
    this.lightning.rotation =
      PhaserMath.Angle.Between(this.lightning.x, this.lightning.y, this.x, this.y) - Math.PI / 2;

    // Calculate the distance from the lightning source to the pointer
    const distance = PhaserMath.Distance.Between(
      this.lightning.x,
      this.lightning.y,
      this.x,
      this.y,
    );

    // Create the lightning texture
    this.createLightningTexture(this.lightningTexture.width / 2, 0, 100, 3, false, distance);

    // Make the lightning sprite visible
    this.lightning.setAlpha(1);

    // Fade out the lightning sprite using a tween on the alpha property.
    // Check out the "Easing function" examples for more info.
    this.scene.tweens.chain({
      targets: this.lightning,
      tweens: [
        { alpha: 0.5, duration: 100, ease: 'Bounce.Out' },
        { alpha: 1.0, duration: 100, ease: 'Bounce.Out' },
        { alpha: 0.5, duration: 100, ease: 'Bounce.Out' },
        { alpha: 1.0, duration: 100, ease: 'Bounce.Out' },
        { alpha: 0, duration: 250, ease: 'Cubic.In' },
      ],
    });

    // Create the flash
    this.flash.setAlpha(1);
    this.scene.tweens.add({ targets: this.flash, alpha: 0, duration: 100, ease: 'Cubic.In' });
  }

  createLightningTexture(
    x: number,
    y: number,
    segments: number,
    boltWidth: number,
    branch: boolean,
    distance: number,
  ) {
    // Get the canvas drawing context for the lightningTexture
    const ctx = this.lightningTexture.context;
    const width = this.lightningTexture.width;
    const height = this.lightningTexture.height;

    // Our lightning will be made up of several line segments starting at
    // the center of the top edge of the bitmap and ending at the target.

    // Clear the canvas
    if (!branch) ctx.clearRect(0, 0, width, height);

    // Draw each of the segments
    for (let i = 0; i < segments; i++) {
      // Set the lightning color and bolt width
      ctx.strokeStyle = 'rgb(255, 255, 255)';
      ctx.lineWidth = boltWidth;

      ctx.beginPath();
      ctx.moveTo(x, y);

      // Calculate an x offset from the end of the last line segment and
      // keep it within the bounds of the bitmap
      if (branch) {
        // For a branch
        x += PhaserMath.Between(-10, 10);
      } else {
        // For the main bolt
        x += PhaserMath.Between(-30, 30);
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
        y += PhaserMath.Between(10, 20);
      } else {
        // For the main bolt
        y += PhaserMath.Between(20, Math.floor(distance / segments));
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
        if (PhaserMath.Between(1, 100) <= 20) {
          // Draws another, thinner, bolt starting from this position
          this.createLightningTexture(x, y, 10, 1, true, distance);
        }
      }
    }

    // This just tells the engine it should update the texture cache
    this.lightningTexture.refresh();
  }
}
