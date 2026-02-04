export const createGroup = (game: Phaser.Game) => game.add.group();

export const getFirstDead = <T extends Phaser.Sprite>(group: Phaser.Group) =>
  group.getFirstDead() as T | null;

export const reviveAndReset = (sprite: Phaser.Sprite, x: number, y: number) => {
  sprite.revive();
  sprite.reset(x, y);
};
