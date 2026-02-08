import type { Input, Scene } from 'phaser';
import { GameEvents, GameEventType } from '../bridge/game-events';
import { Direction, settings } from '../global-config';
import { keys } from '../input-config';
import { TextureKey } from '../texture-keys';
import { ArcadePrefab } from './arcade-prefab';

export class Player extends ArcadePrefab {
  gravity = 500;
  acceleration = 500;
  drag = 500;
  maxSpeed = 270;
  jumpPower = 350;
  immortalState = false;
  attackState = false;
  moveState = false;
  defensePoints = 5;
  direction = Direction.Right;
  damagePoints = 50;
  immortalStateAt: number;
  attackStateAt: number;
  immortalDuration = 3000;
  immortalDefaultDuration = 3000;
  attackDuration = 333;
  isActiveJumpKey = false;
  isAttackKeyPressed = false;
  private playerReadyEmitted = false;
  private inputKeys?: {
    left: Input.Keyboard.Key;
    right: Input.Keyboard.Key;
    jump: Input.Keyboard.Key;
    attack: Input.Keyboard.Key;
  };

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, TextureKey.Player);

    this.immortalStateAt = this.scene.time.now;
    this.attackStateAt = this.scene.time.now;

    this.body.setGravityY(this.gravity);

    this.body.setDragX(this.drag);
    this.body.setMaxVelocity(this.maxSpeed, this.jumpPower * 2);

    this.setCollideWorldBounds(true);
    this.setActive(true);

    this.health = +settings.storage.getHealthPoints();

    this.ensureAnimations();

    this.inputKeys = this.scene.input.keyboard?.addKeys({
      left: keys.moveLeft,
      right: keys.moveRight,
      jump: keys.jump,
      attack: keys.attack,
    }) as typeof this.inputKeys;

    this.on('killed', () => {
      this.level.gameOver();
    });
  }

  private ensureAnimations() {
    if (!this.scene.anims.exists('player-stay')) {
      this.scene.anims.create({
        key: 'player-stay',
        frames: [{ key: TextureKey.Player, frame: 'player-walk-1.png' }],
        frameRate: 10,
        repeat: -1,
      });
    }

    if (!this.scene.anims.exists('player-walk')) {
      this.scene.anims.create({
        key: 'player-walk',
        frames: this.scene.anims.generateFrameNames(TextureKey.Player, {
          prefix: 'player-walk-',
          start: 1,
          end: 4,
          suffix: '.png',
        }),
        frameRate: 15,
        repeat: -1,
      });
    }

    if (!this.scene.anims.exists('player-attack')) {
      this.scene.anims.create({
        key: 'player-attack',
        frames: this.scene.anims.generateFrameNames(TextureKey.Player, {
          prefix: 'player-attack-',
          start: 1,
          end: 3,
          suffix: '.png',
        }),
        frameRate: 10,
        repeat: -1,
      });
    }
  }

  getHP(healthPoints: number) {
    this.health += +healthPoints;
    this.level.hud.updateHealthState();
    this.write(healthPoints.toString() + 'HP', settings.font.whiteWithBlue);
  }

  immortal(duration: number) {
    this.immortalDuration = duration;
    this.immortalStateAt = this.scene.time.now;
    this.immortalState = true;
    this.alpha = 0.5;
  }

  write(text: string, style: Record<string, unknown>) {
    const textSprite = this.scene.add.text(this.x, this.y, text, style);
    this.scene.tweens.add({
      targets: textSprite,
      alpha: 0,
      duration: 1000,
      ease: 'Linear',
      onComplete: () => {
        textSprite.destroy();
      },
    });
  }

  makeDamage(damagePoint: number) {
    if (this.immortalState) return;

    if (damagePoint < this.defensePoints) {
      damagePoint = 1;
    } else {
      damagePoint = damagePoint - this.defensePoints;
    }

    this.damage(damagePoint);
    this.level.hud.updateHealthState();
    this.write(damagePoint.toString(), settings.font.whiteWithRed);
    this.immortal(this.immortalDefaultDuration);
  }

  jump() {
    const jumpKey = this.inputKeys?.jump;
    if (
      jumpKey?.isDown &&
      (this.body.blocked.down || this.body.touching.down) &&
      !this.isActiveJumpKey
    ) {
      this.isActiveJumpKey = true;
      this.body.setVelocityY(-this.jumpPower);
    }

    if (!jumpKey?.isDown) {
      this.isActiveJumpKey = false;
    }
  }

  move() {
    const rightKey = this.inputKeys?.right;
    const leftKey = this.inputKeys?.left;
    if (rightKey?.isDown) {
      this.moveState = true;
      this.body.setAccelerationX(this.acceleration);
      this.direction = Direction.Right;
      this.setFlipX(false);
    } else if (leftKey?.isDown) {
      this.moveState = true;
      this.body.setAccelerationX(-this.acceleration);
      this.direction = Direction.Left;
      this.setFlipX(true);
    } else {
      this.moveState = false;
      this.body.setAccelerationX(0);
    }
  }

  attack() {
    const attackKey = this.inputKeys?.attack;
    if (attackKey?.isDown && !this.attackState && !this.isAttackKeyPressed) {
      this.isAttackKeyPressed = true;
      this.attackState = true;
      this.attackStateAt = this.scene.time.now;
    }

    if (!attackKey?.isDown) {
      this.isAttackKeyPressed = false;
    }

    if (this.scene.time.now - this.attackStateAt > this.attackDuration) {
      this.attackState = false;
    }
  }

  updateState() {
    if (this.immortalState && this.scene.time.now - this.immortalStateAt > this.immortalDuration) {
      this.alpha = 1;
      this.immortalState = false;
    }

    if (this.attackState) {
      this.play('player-attack', true);
    } else if (this.moveState) {
      this.play('player-walk', true);
    } else {
      this.play('player-stay', true);
    }

    if (this.frame) {
      this.body.setSize(this.frame.width, this.frame.height);
    }
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    if (!this.playerReadyEmitted && (this.body.blocked.down || this.body.touching.down)) {
      this.playerReadyEmitted = true;
      GameEvents.emit(GameEventType.PlayerReady, { name: this.level.sys.settings.key });
    }

    this.move();
    this.jump();
    this.attack();

    this.updateState();
  }
}
