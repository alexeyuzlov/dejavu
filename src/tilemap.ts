export type PrefabConstructor = new (
  scene: Phaser.Scene,
  x: number,
  y: number,
  ...args: any[]
) => Phaser.GameObjects.GameObject;

export const createLevelMap = (
  scene: Phaser.Scene,
  mapKey: string,
  tilesetKey: string,
  layerName: string,
  collisionStart: number = 1,
  collisionEnd: number = 5,
) => {
  const map = scene.make.tilemap({ key: mapKey });
  const tileset = map.addTilesetImage(tilesetKey);
  const layer = map.createLayer(layerName, tileset, 0, 0);
  layer.setCollisionBetween(collisionStart, collisionEnd);
  scene.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  scene.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  return { map, layer };
};

export const createObjectsFromMap = (
  scene: Phaser.Scene,
  map: Phaser.Tilemaps.Tilemap,
  objectLayer: string,
  name: string,
  group: Phaser.GameObjects.Group,
  className?: PrefabConstructor,
) => {
  const objects = map.createFromObjects(objectLayer, {
    name,
    classType: className as unknown as Phaser.Types.Tilemaps.CreateFromObjectsClassTypeConstructor,
    scene,
    key: name,
  });
  if (objects.length) {
    group.addMultiple(objects);
  }
  return group;
};
