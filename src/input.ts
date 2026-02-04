export const isKeyDown = (game: Phaser.Game, keyCode: number) =>
  game.input.keyboard.isDown(keyCode);

export const bindKeyDown = (
  game: Phaser.Game,
  keyCode: number,
  handler: () => void,
  context?: any,
) => game.input.keyboard.addKey(keyCode).onDown.add(handler, context);
