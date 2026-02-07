import { AbstractPrefab } from './abstract-prefab';
import { ArcadePrefab } from './arcade-prefab';
import { createGame, createZone } from '../test/phaser-mock';
import { TextureKey } from '../texture-keys';

describe('AbstractPrefab', () => {
  it('uses current state as level and adds to game', () => {
    const zone = createZone();
    const game = createGame({ zone });
    const prefab = new AbstractPrefab(game as never, 5, 10, TextureKey.Transparent);

    expect(prefab.level).toBe(zone);
  });
});

describe('ArcadePrefab', () => {
  it('enables arcade physics on construction', () => {
    const zone = createZone();
    const game = createGame({ zone });
    const prefab = new ArcadePrefab(game as never, 0, 0, TextureKey.Transparent);

    expect(game.physics.arcade.enabled).toContain(prefab);
  });
});
