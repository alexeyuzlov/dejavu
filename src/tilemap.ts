export const createLevelMap = (
  game: Phaser.Game,
  mapKey: string,
  tilesetKey: string,
  layerName: string,
  collisionStart: number = 1,
  collisionEnd: number = 5,
) => {
  const map = game.add.tilemap(mapKey);
  map.addTilesetImage(tilesetKey);
  map.setCollisionBetween(collisionStart, collisionEnd);
  const layer = map.createLayer(layerName);
  layer.resizeWorld();
  return { map, layer };
};

export const createObjectsFromMap = (
  map: Phaser.Tilemap,
  objectLayer: string,
  name: string,
  group: Phaser.Group,
  className?: object,
) => {
  const index = map.getTilesetIndex(name);
  if (!index) return group;

  const firstGid = map.tilesets[index].firstgid;
  if (className) {
    map.createFromObjects(objectLayer, firstGid, name, 0, true, false, group, className);
  } else {
    map.createFromObjects(objectLayer, firstGid, name, 0, true, false, group);
  }
  return group;
};
