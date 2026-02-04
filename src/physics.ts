export const enableArcade = (game: Phaser.Game, target: any) =>
  game.physics.arcade.enable(target);

export const collideArcade = (
  game: Phaser.Game,
  object1: any,
  object2: any,
  collideCallback?: (obj1: any, obj2: any) => void,
  processCallback?: (obj1: any, obj2: any) => boolean,
  callbackContext?: any,
) => game.physics.arcade.collide(object1, object2, collideCallback, processCallback, callbackContext);

export const overlapArcade = (
  game: Phaser.Game,
  object1: any,
  object2: any,
  overlapCallback?: (obj1: any, obj2: any) => void,
  processCallback?: (obj1: any, obj2: any) => boolean,
  callbackContext?: any,
) => game.physics.arcade.overlap(object1, object2, overlapCallback, processCallback, callbackContext);

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
  if (config.gravityX !== undefined) body.gravity.x = config.gravityX;
  if (config.gravityY !== undefined) body.gravity.y = config.gravityY;
  if (config.dragX !== undefined) body.drag.x = config.dragX;
  if (config.dragY !== undefined) body.drag.y = config.dragY;
  if (config.maxVelocityX !== undefined) body.maxVelocity.x = config.maxVelocityX;
  if (config.maxVelocityY !== undefined) body.maxVelocity.y = config.maxVelocityY;
  if (config.collideWorldBounds !== undefined) body.collideWorldBounds = config.collideWorldBounds;
  if (config.immovable !== undefined) body.immovable = config.immovable;
  if (config.moves !== undefined) body.moves = config.moves;
  if (config.velocityX !== undefined) body.velocity.x = config.velocityX;
  if (config.velocityY !== undefined) body.velocity.y = config.velocityY;
  if (config.accelerationX !== undefined) body.acceleration.x = config.accelerationX;
  if (config.accelerationY !== undefined) body.acceleration.y = config.accelerationY;
};
