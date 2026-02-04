import { applyBodyConfig, collideArcade, killSprite } from '../physics';
import { onKilled } from '../events';
import { Direction, settings } from '../global-config';
import { AbstractPrefab } from './abstract-prefab';

export type PlayerInput = {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  jump: Phaser.Input.Keyboard.Key;
  attack: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
};

export class Player extends AbstractPrefab {
  health: number;
  gravity: number;
  acceleration: number;
  drag: number;
  maxSpeed: number;
  jumpPower: number;
  immortalState: boolean;
  attackState: boolean;
  moveState: boolean;
  defensePoints: number;
  direction: Direction;
  damagePoints: number;
  immortalStateAt: number;
  attackStateAt: number;
  immortalDuration: number;
  immortalDefaultDuration: number;
  attackDuration: number;
  isActiveJumpKey: boolean;
  isAttackKeyPressed: boolean;
  inputState: PlayerInput | null;

  constructor(scene: Phaser.Scene, x: number, y: number, inputState: PlayerInput | null) {
    super(scene, x, y, 'player');

    this.gravity = 500;
    this.acceleration = 500;
    this.drag = 500;
    this.maxSpeed = 270;
    this.jumpPower = 350;
    this.immortalState = false;
    this.attackState = false;
    this.moveState = false;
    this.defensePoints = 5;
    this.direction = Direction.Right;
    this.damagePoints = 50;
    this.immortalStateAt = this.scene.time.now;
    this.attackStateAt = this.scene.time.now;
    this.immortalDuration = 3 * 1000;
    this.immortalDefaultDuration = 3 * 1000;
    this.attackDuration = (1 / 3) * 1000;
    this.isActiveJumpKey = false;
    this.isAttackKeyPressed = false;
    this.inputState = inputState;

    applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { gravityY: this.gravity });
    this.setOrigin(0.5, 1);

    applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, {
      dragX: this.drag,
      maxVelocityX: this.maxSpeed,
      maxVelocityY: this.jumpPower * 2,
    });

    applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { collideWorldBounds: true });
    this.setActive(true);

    this.health = +settings.storage.getHealthPoints();

    const anims = this.scene.anims;
    if (!anims.exists('player-stay')) {
      anims.create({
        key: 'player-stay',
        frames: [{ key: 'player', frame: 'player-walk-1.png' }],
        frameRate: 10,
        repeat: -1,
      });
    }
    if (!anims.exists('player-walk')) {
      anims.create({
        key: 'player-walk',
        frames: anims.generateFrameNames('player', {
          prefix: 'player-walk-',
          start: 1,
          end: 4,
          suffix: '.png',
        }),
        frameRate: 15,
        repeat: -1,
      });
    }
    if (!anims.exists('player-attack')) {
      anims.create({
        key: 'player-attack',
        frames: anims.generateFrameNames('player', {
          prefix: 'player-attack-',
          start: 1,
          end: 3,
          suffix: '.png',
        }),
        frameRate: 10,
        repeat: -1,
      });
    }

    onKilled(this, () => {
      this.level.gameOver();
    });
  }

  getHP(healthPoints: number) {
    this.health += +healthPoints;
    this.level.hud.updateHealthState();
    this.write(healthPoints.toString() + 'HP', settings.font.whiteWithBlue);
  }

  immortal(duration: any) {
    this.immortalDuration = duration;
    this.immortalStateAt = this.scene.time.now;
    this.immortalState = true;
    this.setAlpha(0.5);
  }

  write(text: any, style: any) {
    const textSprite = this.scene.add.text(this.x, this.y, text, style);
    this.scene.tweens.add({
      targets: textSprite,
      alpha: 0,
      duration: 1 * 1000,
      ease: 'Linear',
      onComplete: () => {
        textSprite.destroy();
      },
    });
  }

  makeDamage(damagePoint: any) {
    if (damagePoint < this.defensePoints) {
      damagePoint = 1;
    } else {
      damagePoint = damagePoint - this.defensePoints;
    }

    this.health = Math.max(0, (this.health ?? 0) - damagePoint);
    if (this.health <= 0) {
      killSprite(this);
    }
    this.write(damagePoint.toString(), settings.font.whiteWithRed);
    this.immortal(this.immortalDefaultDuration);
  }

  jump() {
    const input = this.inputState;
    if (!input) return;

    if (
      input.jump.isDown &&
      ((this.body as Phaser.Physics.Arcade.Body).blocked.down ||
        (this.body as Phaser.Physics.Arcade.Body).touching.down) &&
      !this.isActiveJumpKey
    ) {
      this.isActiveJumpKey = true;
      applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { velocityY: -this.jumpPower });
    }

    if (!input.jump.isDown) {
      this.isActiveJumpKey = false;
    }
  }

  move() {
    const input = this.inputState;
    if (!input) {
      this.moveState = false;
      applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { accelerationX: 0 });
      return;
    }

    if (input.cursors.right?.isDown || input.right.isDown) {
      this.moveState = true;
      applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { accelerationX: this.acceleration });
      this.direction = Direction.Right;
      this.scaleX = 1;
    } else if (input.cursors.left?.isDown || input.left.isDown) {
      this.moveState = true;
      applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { accelerationX: -this.acceleration });
      this.direction = Direction.Left;
      this.scaleX = -1;
    } else {
      this.moveState = false;
      applyBodyConfig(this.body as Phaser.Physics.Arcade.Body, { accelerationX: 0 });
    }
  }

  attack() {
    const input = this.inputState;
    if (!input) return;

    if (
      input.attack.isDown &&
      !this.attackState &&
      !this.isAttackKeyPressed
    ) {
      this.isAttackKeyPressed = true;
      this.attackState = true;
      this.attackStateAt = this.scene.time.now;
    }

    if (!input.attack.isDown) {
      this.isAttackKeyPressed = false;
    }

    if (this.scene.time.now - this.attackStateAt > this.attackDuration) {
      this.attackState = false;
    }
  }

  updateState() {
    if (this.immortalState && this.scene.time.now - this.immortalStateAt > this.immortalDuration) {
      this.setAlpha(1);
      this.immortalState = false;
    }

    if (this.attackState) {
      this.anims.play('player-attack', true);
    } else if (this.moveState) {
      this.anims.play('player-walk', true);
    } else {
      this.anims.play('player-stay', true);
    }

    const currentFrame = this.anims.currentFrame;
    if (currentFrame) {
      (this.body as Phaser.Physics.Arcade.Body).setSize(
        currentFrame.frame.width,
        currentFrame.frame.height,
      );
    }
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    collideArcade(this.scene, this, this.level.layer);

    this.move();
    this.jump();
    this.attack();

    this.updateState();
  }
}
