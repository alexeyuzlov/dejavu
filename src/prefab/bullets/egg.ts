import type { Scene } from 'phaser';
import { TextureKey } from '../../texture-keys';
import { ArcadePrefab } from '../arcade-prefab';

export class Egg extends ArcadePrefab {
  speed = 180;
  damagePoints = 35;
  eggCrashState = false;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, TextureKey.Egg);
    this.body.setAllowGravity(false);
    this.kill();

    this.ensureAnimations();
    this.play('egg', true);

    this.scene.physics.add.collider(this, this.level.player, () => {
      this.kill();
      if (!this.level.player.attackState) {
        this.level.player.makeDamage(this.damagePoints);
      }
    });

    this.scene.physics.add.collider(this, this.level.layer, () => {
      if (!this.eggCrashState) {
        this.setEggCrash();
      }
    });
  }

  private ensureAnimations() {
    if (!this.scene.anims.exists('egg')) {
      this.scene.anims.create({
        key: 'egg',
        frames: [{ key: TextureKey.Egg, frame: 'egg.png' }],
        frameRate: 10,
        repeat: -1,
      });
    }

    if (!this.scene.anims.exists('egg-crash')) {
      this.scene.anims.create({
        key: 'egg-crash',
        frames: [{ key: TextureKey.Egg, frame: 'egg-crash.png' }],
        frameRate: 10,
        repeat: -1,
      });
    }
  }

  resetEggState() {
    this.eggCrashState = false;
    this.play('egg', true);

    if (this.frame) {
      this.body.setSize(this.frame.width, this.frame.height);
    }
  }

  setEggCrash() {
    this.eggCrashState = true;
    this.play('egg-crash', true);

    if (this.frame) {
      this.body.setSize(this.frame.width, this.frame.height);
    }
  }
}
