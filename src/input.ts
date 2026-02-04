export const Keys = {
  moveLeft: Phaser.Input.Keyboard.KeyCodes.LEFT,
  moveRight: Phaser.Input.Keyboard.KeyCodes.RIGHT,
  jump: Phaser.Input.Keyboard.KeyCodes.Z,
  attack: Phaser.Input.Keyboard.KeyCodes.X,
  pause: Phaser.Input.Keyboard.KeyCodes.P,
  advance: Phaser.Input.Keyboard.KeyCodes.SPACE,
} as const;

export type KeyName = keyof typeof Keys;

export const isKeyDown = (scene: Phaser.Scene, key: KeyName) => {
  const keyboard = scene.input.keyboard;
  if (!keyboard) return false;
  return keyboard.addKey(Keys[key]).isDown;
};

export const bindKeyDown = (
  scene: Phaser.Scene,
  key: KeyName,
  handler: () => void,
  context?: any,
) => {
  const keyboard = scene.input.keyboard;
  if (!keyboard) return;
  keyboard.addKey(Keys[key]).on('down', handler, context);
};
