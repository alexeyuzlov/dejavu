import { Runner } from './runner';
import { Direction } from '../../global-config';
import { createGame, createZone } from '../../test/phaser-mock';

describe('Runner', () => {
  it('toggles direction and velocity', () => {
    const zone = createZone();
    const game = createGame({ zone });
    const runner = new Runner(game as never, 0, 0);

    runner.direction = Direction.Right;
    runner.body.velocity.x = runner.velocity;
    runner.scale.x = 1;
    runner.toggleDirection();

    expect(runner.direction).toBe(Direction.Left);
    expect(runner.body.velocity.x).toBe(-runner.velocity);
    expect(runner.scale.x).toBe(-1);
  });

  it('switches direction on blocked movement', () => {
    const zone = createZone();
    const game = createGame({ zone });
    const runner = new Runner(game as never, 0, 0);

    runner.body.blocked.left = true;
    runner.update();

    expect(runner.direction).toBe(Direction.Left);
  });
});
