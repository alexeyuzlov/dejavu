import { Flier } from './flier';
import { createGame, createPlayerStub, createZone } from '../../test/phaser-mock';

describe('Flier', () => {
  it('moves toward player when in camera', () => {
    const player = createPlayerStub({ x: 100, y: 0, width: 10 });
    const zone = createZone({ player });
    const game = createGame({ zone });
    const flier = new Flier(game as never, 0, 0);

    flier.update();

    expect(flier.body.velocity.x).toBeGreaterThan(0);
  });

  it('stops when out of camera', () => {
    const zone = createZone();
    const game = createGame({ zone });
    const flier = new Flier(game as never, 0, 0);
    flier.inCamera = false;
    flier.body.velocity.x = 10;
    flier.body.velocity.y = 10;

    flier.update();

    expect(flier.body.velocity.x).toBe(0);
    expect(flier.body.velocity.y).toBe(0);
  });
});
