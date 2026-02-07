import { FlierCrash } from './flier-crash';
import { Egg } from '../bullets/egg';
import { createGame, createPlayerStub, createZone } from '../../test/phaser-mock';

describe('FlierCrash', () => {
  it('spawns eggs after shot delay', () => {
    const player = createPlayerStub({ x: 0, y: 0, width: 10 });
    const zone = createZone({ player });
    const game = createGame({ zone, timeNow: 4000 });
    const flier = new FlierCrash(game as never, 0, 0);

    flier.lastEggShotAt = 0;
    flier.update();

    const egg = flier.eggs.children[0] as Egg;
    expect(egg.alive).toBe(true);
    expect(egg.body.velocity.y).toBe(egg.speed);
  });

  it('stops when out of camera', () => {
    const zone = createZone();
    const game = createGame({ zone });
    const flier = new FlierCrash(game as never, 0, 0);
    flier.inCamera = false;
    flier.body.velocity.x = 10;
    flier.body.velocity.y = 10;

    flier.update();

    expect(flier.body.velocity.x).toBe(0);
    expect(flier.body.velocity.y).toBe(0);
  });
});
