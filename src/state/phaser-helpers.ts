export const followLockonCamera = (game: Phaser.Game, target: Phaser.Sprite) => {
  game.camera.follow(target, Phaser.Camera.FOLLOW_LOCKON);
};

export const addDelayedEvent = (
  game: Phaser.Game,
  delayMs: number,
  callback: () => void,
  context?: any,
) => game.time.events.add(delayMs, callback, context);

export const addRepeatEvent = (
  game: Phaser.Game,
  delayMs: number,
  repeatCount: number,
  callback: () => void,
  context?: any,
) => game.time.events.repeat(delayMs, repeatCount, callback, context);

export const now = (game: Phaser.Game) => game.time.now;

export const seconds = (value: number) => Phaser.Timer.SECOND * value;
