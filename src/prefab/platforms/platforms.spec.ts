import { Platform } from './platform';
import { PlatformHorizontal } from './platform-horizontal';
import { PlatformVertical } from './platform-vertical';
import { Direction } from '../../global-config';
import { TextureKey } from '../../texture-keys';
import { createGame, createZone } from '../../test/phaser-mock';

class TestPlatform extends Platform {
  constructor(game: Phaser.Game) {
    super(game, 0, 0, TextureKey.PlatformH);
    this.direction = Direction.Right;
  }
}

describe('Platform', () => {
  it('toggles horizontal direction', () => {
    const zone = createZone();
    const game = createGame({ zone });
    const platform = new TestPlatform(game as never);

    platform.toggleDirection();

    expect(platform.direction).toBe(Direction.Left);
    expect(platform.body.velocity.x).toBe(-platform.velocity);
  });
});

describe('PlatformHorizontal', () => {
  it('starts moving to the right', () => {
    const zone = createZone();
    const game = createGame({ zone });
    const platform = new PlatformHorizontal(game as never, 0, 0);

    expect(platform.direction).toBe(Direction.Right);
    expect(platform.body.velocity.x).toBe(platform.velocity);
  });
});

describe('PlatformVertical', () => {
  it('starts moving down', () => {
    const zone = createZone();
    const game = createGame({ zone });
    const platform = new PlatformVertical(game as never, 0, 0);

    expect(platform.direction).toBe(Direction.Down);
    expect(platform.body.velocity.y).toBe(platform.velocity);
  });
});
