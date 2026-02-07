import { Exit } from './exit';
import { Spike } from './spike';
import { IceSpike } from './ice-spike';
import { Transparent } from './transparent';
import { PreloadBar } from './preload-bar';
import { BlackScreen } from './black-screen';
import { HUD } from './hud';
import { createGame, createPlayerStub, createZone, createGroup } from '../test/phaser-mock';

describe('Exit', () => {
  it('advances the level on collide', () => {
    const startNextLevel = vi.fn();
    const zone = createZone({ startNextLevel, exits: createGroup([{}]) });
    const game = createGame({ zone });
    const exit = new Exit(game as never, 0, 0);

    exit.update();
    game.physics.arcade.runCollide();

    expect(startNextLevel).toHaveBeenCalled();
  });
});

describe('Spike', () => {
  it('damages player on collide', () => {
    const makeDamage = vi.fn();
    const player = createPlayerStub({ makeDamage });
    const zone = createZone({ player });
    const game = createGame({ zone });
    const spike = new Spike(game as never, 0, 0);

    spike.update();
    game.physics.arcade.runCollide();

    expect(makeDamage).toHaveBeenCalledWith(spike.damagePoints);
  });
});

describe('IceSpike', () => {
  it('falls when player is below within distance', () => {
    const player = createPlayerStub({ x: 10, y: 200 });
    const zone = createZone({ player });
    const game = createGame({ zone });
    const spike = new IceSpike(game as never, 0, 0);
    spike.distanceToTarget = 100;

    spike.update();

    expect(spike.body.gravity.y).toBe(100);
    expect(spike.body.acceleration.y).toBe(1000);
  });

  it('kills itself below world height', () => {
    const zone = createZone();
    const game = createGame({ zone });
    const spike = new IceSpike(game as never, 0, 0);
    spike.y = game.world.height + 1;

    spike.update();

    expect(spike.alive).toBe(false);
  });
});

describe('Transparent', () => {
  it('does not move', () => {
    const zone = createZone();
    const game = createGame({ zone });
    const transparent = new Transparent(game as never, 0, 0);

    expect(transparent.body.moves).toBe(false);
  });
});

describe('PreloadBar', () => {
  it('anchors to bottom right', () => {
    const zone = createZone();
    const game = createGame({ zone });
    const bar = new PreloadBar(game as never, 0, 0);

    expect(bar.anchor.x).toBe(1);
    expect(bar.anchor.y).toBe(1);
  });
});

describe('BlackScreen', () => {
  it('updates text and stays on top', () => {
    const zone = createZone();
    const game = createGame({ zone });
    const screen = new BlackScreen(game as never);

    screen.setText('done');
    screen.update();

    expect(screen.text.text).toBe('done');
  });
});

describe('HUD', () => {
  it('renders player health', () => {
    const player = createPlayerStub({ health: 42 });
    const zone = createZone({ player });
    const game = createGame({ zone });
    const hud = new HUD(game as never, 0, 0);

    expect(hud.healthState.text).toBe('42');
  });
});
