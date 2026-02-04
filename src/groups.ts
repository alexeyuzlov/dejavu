export const createGroup = (scene: Phaser.Scene) => scene.add.group();

export const getFirstDead = <T extends Phaser.GameObjects.GameObject>(group: Phaser.GameObjects.Group) =>
  group.getFirstDead(false) as T | null;

export const reviveAndReset = (
  sprite: Phaser.GameObjects.Sprite & {
    body?: Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody;
  },
  x: number,
  y: number,
) => {
  sprite.setActive(true);
  sprite.setVisible(true);
  sprite.setPosition(x, y);
  if (sprite.body) {
    sprite.body.enable = true;
    sprite.body.reset(x, y);
  }
};
