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
