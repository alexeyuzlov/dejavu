import { isKeyDown } from '../input';
import { applyBodyConfig, collideArcade, enableArcade } from '../physics';
import { addTween } from '../tweens';
import { onKilled } from '../events';
import { timeNow, secondsToMs } from '../time';
import { Direction, settings } from '../global-config';
import { AbstractPrefab } from './abstract-prefab';

export class Player extends AbstractPrefab {
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

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'player');
    enableArcade(game, this);

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
    this.immortalStateAt = timeNow(this.game);
    this.attackStateAt = timeNow(this.game);
    this.immortalDuration = secondsToMs(3);
    this.immortalDefaultDuration = secondsToMs(3);
    this.attackDuration = secondsToMs(1 / 3);
    this.isActiveJumpKey = false;
    this.isAttackKeyPressed = false;

    applyBodyConfig(this.body, { gravityY: this.gravity });
    this.anchor.set(0.5, 1);

    applyBodyConfig(this.body, {
      dragX: this.drag,
      maxVelocityX: this.maxSpeed,
      maxVelocityY: this.jumpPower * 2,
    });

    applyBodyConfig(this.body, { collideWorldBounds: true });
    this.alive = true;

    this.health = +settings.storage.getHealthPoints();

    this.animations.add('stay', ['player-walk-1.png'], 10, true);
    this.animations.add(
      'walk',
      Phaser.Animation.generateFrameNames('player-walk-', 1, 4, '.png', 0),
      15,
      true,
    );
    this.animations.add(
      'attack',
      Phaser.Animation.generateFrameNames('player-attack-', 1, 3, '.png', 0),
      10,
      true,
    );

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
    this.immortalStateAt = timeNow(this.game);
    this.immortalState = true;
    this.alpha = 0.5;
  }

  write(text: any, style: any) {
    var textSprite = this.game.add.text(this.x, this.y, text, style);
    var tween = addTween(this.game, textSprite).to(
      { alpha: 0 },
      secondsToMs(1),
      Phaser.Easing.Linear.None,
      true,
      0,
      0,
      false,
    );

    tween.onComplete.add(() => {
      textSprite.destroy();
    });
  }

  makeDamage(damagePoint: any) {
    if (damagePoint < this.defensePoints) {
      damagePoint = 1;
    } else {
      damagePoint = damagePoint - this.defensePoints;
    }

    this.damage(damagePoint);
    this.write(damagePoint.toString(), settings.font.whiteWithRed);
    this.immortal(this.immortalDefaultDuration);
  }

  jump() {
    if (
      isKeyDown(this.game, 'jump') &&
      (this.body.blocked.down || this.body.touching.down) &&
      !this.isActiveJumpKey
    ) {
      this.isActiveJumpKey = true;
      applyBodyConfig(this.body, { velocityY: -this.jumpPower });
    }

    if (!isKeyDown(this.game, 'jump')) {
      this.isActiveJumpKey = false;
    }
  }

  move() {
    if (isKeyDown(this.game, 'moveRight')) {
      this.moveState = true;
      applyBodyConfig(this.body, { accelerationX: this.acceleration });
      this.direction = Direction.Right;
      this.scale.x = 1;
    } else if (isKeyDown(this.game, 'moveLeft')) {
      this.moveState = true;
      applyBodyConfig(this.body, { accelerationX: -this.acceleration });
      this.direction = Direction.Left;
      this.scale.x = -1;
    } else {
      this.moveState = false;
      applyBodyConfig(this.body, { accelerationX: 0 });
    }
  }

  attack() {
    if (
      isKeyDown(this.game, 'attack') &&
      !this.attackState &&
      !this.isAttackKeyPressed
    ) {
      this.isAttackKeyPressed = true;
      this.attackState = true;
      this.attackStateAt = timeNow(this.game);
    }

    if (!isKeyDown(this.game, 'attack')) {
      this.isAttackKeyPressed = false;
    }

    if (timeNow(this.game) - this.attackStateAt > this.attackDuration) {
      this.attackState = false;
    }
  }

  state() {
    if (this.immortalState && timeNow(this.game) - this.immortalStateAt > this.immortalDuration) {
      this.alpha = 1;
      this.immortalState = false;
    }

    if (this.attackState) {
      this.animations.play('attack');
    } else if (this.moveState) {
      this.animations.play('walk');
    } else {
      this.animations.play('stay');
    }

    this.body.width = this.animations.currentFrame.width;
    this.body.height = this.animations.currentFrame.height;
  }

  update() {
    collideArcade(this.game, this, this.level.layer);

    this.move();
    this.jump();
    this.attack();

    this.state();
  }
}
