import type { Scene, Tilemaps } from 'phaser';
import { TextureKey } from '../../texture-keys';

export class ZoneMap {
  map: Tilemaps.Tilemap;
  layer: Tilemaps.TilemapLayer;
  objectLayer?: Tilemaps.ObjectLayer;

  constructor(
    private scene: Scene,
    private mapKey: string,
  ) {}

  create() {
    this.map = this.scene.make.tilemap({ key: this.mapKey });
    const groundTileset = this.map.addTilesetImage(TextureKey.Ground, TextureKey.Ground);
    this.layer = this.map.createLayer('layer', groundTileset, 0, 0);
    this.layer.setCollisionBetween(1, 5);
    this.objectLayer = this.map.getObjectLayer('objects');

    return { map: this.map, layer: this.layer, objectLayer: this.objectLayer };
  }
}
