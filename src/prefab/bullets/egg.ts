import { collideArcade, killSprite } from '../../physics';
import { AbstractPrefab } from '../abstract-prefab';

export class Egg extends AbstractPrefab {
  speed: number = 180;
  damagePoints: number = 35;
  eggCrashState: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'egg');

    this.setOrigin(0.5, 0.5);
    killSprite(this);

    this.eggCrashState = false;

    const anims = this.scene.anims;
    if (!anims.exists('egg')) {
      anims.create({
        key: 'egg',
        frames: [{ key: 'egg', frame: 'egg.png' }],
        frameRate: 10,
        repeat: -1,
      });
    }
    if (!anims.exists('egg-crash')) {
      anims.create({
        key: 'egg-crash',
        frames: [{ key: 'egg', frame: 'egg-crash.png' }],
        frameRate: 10,
        repeat: -1,
      });
    }

    this.anims.play('egg');
  }

  setEggCrash() {
    this.eggCrashState = true;
    this.anims.play('egg-crash');

    const currentFrame = this.anims.currentFrame;
    if (currentFrame) {
      const body = this.body as Phaser.Physics.Arcade.Body;
      body.setSize(currentFrame.frame.width, currentFrame.frame.height);
    }
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    collideArcade(this.scene, this, this.level.player, (egg: any, player: any) => {
      killSprite(egg);

      if (!this.level.player.immortalState && !this.level.player.attackState) {
        this.level.player.makeDamage(egg.damagePoints);
        this.level.hud.updateHealthState();
      }
    });

    collideArcade(this.scene, this, this.level.layer, (egg: any, layer: any) => {
      if (!this.eggCrashState) {
        egg.setEggCrash();
      }
    });

    const bounds = this.scene.physics.world.bounds;
    if (this.x < bounds.x || this.x > bounds.right || this.y < bounds.y || this.y > bounds.bottom) {
      killSprite(this);
    }
  }
}
