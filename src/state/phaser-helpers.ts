export const followLockonCamera = (
  scene: Phaser.Scene,
  target: Phaser.GameObjects.GameObject,
) => {
  scene.cameras.main.startFollow(target, true, 0.1, 0.1);
};

export const addDelayedEvent = (
  scene: Phaser.Scene,
  delayMs: number,
  callback: () => void,
  context?: any,
) =>
  scene.time.addEvent({
    delay: delayMs,
    callback,
    callbackScope: context,
  });

export const addRepeatEvent = (
  scene: Phaser.Scene,
  delayMs: number,
  repeatCount: number,
  callback: () => void,
  context?: any,
) =>
  scene.time.addEvent({
    delay: delayMs,
    repeat: Math.max(0, repeatCount - 1),
    callback,
    callbackScope: context,
  });

export const now = (scene: Phaser.Scene) => scene.time.now;

export const seconds = (value: number) => value * 1000;
