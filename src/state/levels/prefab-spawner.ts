import type { Scene, Tilemaps } from 'phaser';
import { ArcadePrefab } from '../../prefab/arcade-prefab';
import type { TextureKeyValue } from '../../texture-keys';

type PrefabConstructor<T extends ArcadePrefab> = new (scene: Scene, x: number, y: number) => T;

export class PrefabSpawner {
  constructor(
    private scene: Scene,
    private map: Tilemaps.Tilemap,
    private objectLayer?: Tilemaps.ObjectLayer,
  ) {}

  spawn(name: TextureKeyValue, classType?: PrefabConstructor<ArcadePrefab>) {
    const group = this.scene.add.group();

    if (!this.objectLayer) {
      return group;
    }

    const tileset = this.map.getTileset(name);
    if (!tileset) {
      return group;
    }

    const tileCount = (tileset as { total?: number }).total ?? 1;
    const maxGid = tileset.firstgid + tileCount - 1;

    for (const object of this.objectLayer.objects) {
      if (!object.gid) continue;
      if (object.gid < tileset.firstgid || object.gid > maxGid) continue;

      const x = object.x ?? 0;
      const y = object.y ?? 0;
      const created = classType
        ? new classType(this.scene, x, y)
        : this.scene.add.sprite(x, y, name);
      group.add(created);
    }

    return group;
  }
}
