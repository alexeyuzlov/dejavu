export const onKilled = (sprite: Phaser.GameObjects.Sprite, handler: () => void) => {
  sprite.on('killed', handler);
};

export const onResume = (scene: Phaser.Scene, handler: (pauseDuration: number) => void) => {
  let pausedAt = 0;
  scene.events.on(Phaser.Scenes.Events.PAUSE, () => {
    pausedAt = scene.time.now;
  });
  scene.events.on(Phaser.Scenes.Events.RESUME, () => {
    if (!pausedAt) return;
    const pauseDuration = scene.time.now - pausedAt;
    pausedAt = 0;
    handler(pauseDuration);
  });
};
