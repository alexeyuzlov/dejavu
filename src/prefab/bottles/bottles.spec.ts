import { BottleHP } from './bottle-hp';
import { BottleSuper } from './bottle-super';
import { createGame, createPlayerStub, createZone } from '../../test/phaser-mock';

describe('bottles', () => {
  it('BottleHP drinks and is removed on overlap', () => {
    const getHP = vi.fn();
    const player = createPlayerStub({ getHP });
    const zone = createZone({ player });
    const game = createGame({ zone });

    const bottle = new BottleHP(game as never, 1, 2);
    bottle.update();
    game.physics.arcade.runOverlap();

    expect(getHP).toHaveBeenCalledWith(bottle.amount);
    expect(bottle.alive).toBe(false);
  });

  it('BottleSuper applies immortal duration', () => {
    const immortal = vi.fn();
    const player = createPlayerStub({ immortal });
    const zone = createZone({ player });
    const game = createGame({ zone });

    const bottle = new BottleSuper(game as never, 1, 2);
    bottle.update();
    game.physics.arcade.runOverlap();

    expect(immortal).toHaveBeenCalledWith(bottle.duration);
    expect(bottle.alive).toBe(false);
  });
});
