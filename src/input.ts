export const Keys = {
  moveLeft: Phaser.Keyboard.LEFT,
  moveRight: Phaser.Keyboard.RIGHT,
  jump: Phaser.Keyboard.Z,
  attack: Phaser.Keyboard.X,
  pause: Phaser.Keyboard.P,
  advance: Phaser.Keyboard.SPACEBAR,
} as const;

export type KeyName = keyof typeof Keys;

export const isKeyDown = (game: Phaser.Game, key: KeyName) =>
  game.input.keyboard.isDown(Keys[key]);

export const bindKeyDown = (
  game: Phaser.Game,
  key: KeyName,
  handler: () => void,
  context?: any,
) => game.input.keyboard.addKey(Keys[key]).onDown.add(handler, context);
