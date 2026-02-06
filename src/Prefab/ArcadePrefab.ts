import { AbstractPrefab } from "./AbstractPrefab";

export class ArcadePrefab extends AbstractPrefab {
    // Phaser.Sprite.body is overly broad; arcade-only prefabs narrow it here.
    // @ts-expect-error: overriding with arcade-only body for this prefab hierarchy
    override body: Phaser.Physics.Arcade.Body;
}
