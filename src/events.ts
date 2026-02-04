export const onKilled = (sprite: Phaser.Sprite, handler: () => void) =>
  sprite.events.onKilled.add(handler);

export const onResume = (game: Phaser.Game, handler: () => void) =>
  game.onResume.add(handler);
