import { Direction, settings } from '../GlobalConfig';
import { AbstractPrefab } from './AbstractPrefab';

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
    game.physics.arcade.enable(this);

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
    this.immortalStateAt = this.game.time.now;
    this.attackStateAt = this.game.time.now;
    this.immortalDuration = Phaser.Timer.SECOND * 3;
    this.immortalDefaultDuration = Phaser.Timer.SECOND * 3;
    this.attackDuration = Phaser.Timer.SECOND / 3;
    this.isActiveJumpKey = false;
    this.isAttackKeyPressed = false;

    this.body.gravity.y = this.gravity;
    this.anchor.set(0.5, 1);

    this.body.drag.x = this.drag;
    this.body.maxVelocity.x = this.maxSpeed;
    this.body.maxVelocity.y = this.jumpPower * 2;

    this.body.collideWorldBounds = true;
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

    this.events.onKilled.add(() => {
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
    this.immortalStateAt = this.game.time.now;
    this.immortalState = true;
    this.alpha = 0.5;
  }

  write(text: any, style: any) {
    var textSprite = this.game.add.text(this.x, this.y, text, style);
    var tween = this.game.add
      .tween(textSprite)
      .to({ alpha: 0 }, Phaser.Timer.SECOND, Phaser.Easing.Linear.None, true, 0, 0, false);

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
      this.game.input.keyboard.isDown(settings.keys.jump) &&
      (this.body.blocked.down || this.body.touching.down) &&
      !this.isActiveJumpKey
    ) {
      this.isActiveJumpKey = true;
      this.body.velocity.y = -this.jumpPower;
    }

    if (!this.game.input.keyboard.isDown(settings.keys.jump)) {
      this.isActiveJumpKey = false;
    }
  }

  move() {
    if (this.game.input.keyboard.isDown(settings.keys.moveRight)) {
      this.moveState = true;
      this.body.acceleration.x = this.acceleration;
      this.direction = Direction.Right;
      this.scale.x = 1;
    } else if (this.game.input.keyboard.isDown(settings.keys.moveLeft)) {
      this.moveState = true;
      this.body.acceleration.x = -this.acceleration;
      this.direction = Direction.Left;
      this.scale.x = -1;
    } else {
      this.moveState = false;
      this.body.acceleration.x = 0;
    }
  }

  attack() {
    if (
      this.game.input.keyboard.isDown(settings.keys.attack) &&
      !this.attackState &&
      !this.isAttackKeyPressed
    ) {
      this.isAttackKeyPressed = true;
      this.attackState = true;
      this.attackStateAt = this.game.time.now;
    }

    if (!this.game.input.keyboard.isDown(settings.keys.attack)) {
      this.isAttackKeyPressed = false;
    }

    if (this.game.time.now - this.attackStateAt > this.attackDuration) {
      this.attackState = false;
    }
  }

  state() {
    if (this.immortalState && this.game.time.now - this.immortalStateAt > this.immortalDuration) {
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
    this.game.physics.arcade.collide(this, this.level.layer);

    this.move();
    this.jump();
    this.attack();

    this.state();
  }
}
