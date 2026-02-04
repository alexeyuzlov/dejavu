export const enableArcade = (scene: Phaser.Scene, target: any) =>
  scene.physics.add.existing(target);

export const collideArcade = (
  scene: Phaser.Scene,
  object1: any,
  object2: any,
  collideCallback?: (obj1: any, obj2: any) => void,
  processCallback?: (obj1: any, obj2: any) => boolean,
  callbackContext?: any,
) => scene.physics.world.collide(object1, object2, collideCallback, processCallback, callbackContext);

export const overlapArcade = (
  scene: Phaser.Scene,
  object1: any,
  object2: any,
  overlapCallback?: (obj1: any, obj2: any) => void,
  processCallback?: (obj1: any, obj2: any) => boolean,
  callbackContext?: any,
) => scene.physics.world.overlap(object1, object2, overlapCallback, processCallback, callbackContext);

export const applyBodyConfig = (
  body: Phaser.Physics.Arcade.Body,
  config: Partial<{
    gravityX: number;
    gravityY: number;
    dragX: number;
    dragY: number;
    maxVelocityX: number;
    maxVelocityY: number;
    collideWorldBounds: boolean;
    immovable: boolean;
    moves: boolean;
    velocityX: number;
    velocityY: number;
    accelerationX: number;
    accelerationY: number;
  }>,
) => {
  if (config.gravityX !== undefined || config.gravityY !== undefined) {
    body.setGravity(config.gravityX ?? body.gravity.x, config.gravityY ?? body.gravity.y);
  }
  if (config.dragX !== undefined || config.dragY !== undefined) {
    body.setDrag(config.dragX ?? body.drag.x, config.dragY ?? body.drag.y);
  }
  if (config.maxVelocityX !== undefined || config.maxVelocityY !== undefined) {
    body.setMaxVelocity(
      config.maxVelocityX ?? body.maxVelocity.x,
      config.maxVelocityY ?? body.maxVelocity.y,
    );
  }
  if (config.collideWorldBounds !== undefined) body.setCollideWorldBounds(config.collideWorldBounds);
  if (config.immovable !== undefined) body.setImmovable(config.immovable);
  if (config.moves !== undefined) body.moves = config.moves;
  if (config.velocityX !== undefined || config.velocityY !== undefined) {
    body.setVelocity(config.velocityX ?? body.velocity.x, config.velocityY ?? body.velocity.y);
  }
  if (config.accelerationX !== undefined || config.accelerationY !== undefined) {
    body.setAcceleration(
      config.accelerationX ?? body.acceleration.x,
      config.accelerationY ?? body.acceleration.y,
    );
  }
};

type ArcadeBodyLike =
  | Phaser.Physics.Arcade.Body
  | Phaser.Physics.Arcade.StaticBody
  | { enable?: boolean };

export const killSprite = (sprite: Phaser.GameObjects.Sprite & { body?: ArcadeBodyLike }) => {
  sprite.setActive(false);
  sprite.setVisible(false);
  if (sprite.body) {
    sprite.body.enable = false;
  }
  sprite.emit('killed');
};
