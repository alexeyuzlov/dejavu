import { Player } from './player';
import { Direction } from '../global-config';
import { keys } from '../input-config';
import { createGame, createZone } from '../test/phaser-mock';

describe('Player', () => {
  it('initializes health from storage', () => {
    const zone = createZone();
    const game = createGame({ zone });
    const player = new Player(game as never, 0, 0);

    expect(player.health).toBe(100);
  });

  it('moves to the right when key is pressed', () => {
    const zone = createZone();
    const pressed = new Set<number>([keys.moveRight]);
    const game = createGame({
      zone,
      keyboardDown: (key) => pressed.has(key),
    });
    const player = new Player(game as never, 0, 0);

    player.move();

    expect(player.moveState).toBe(true);
    expect(player.direction).toBe(Direction.Right);
    expect(player.body.acceleration.x).toBe(player.acceleration);
    expect(player.scale.x).toBe(1);
  });

  it('jumps once per key press', () => {
    const zone = createZone();
    const pressed = new Set<number>([keys.jump]);
    const game = createGame({
      zone,
      keyboardDown: (key) => pressed.has(key),
    });
    const player = new Player(game as never, 0, 0);
    player.body.blocked.down = true;

    player.jump();
    expect(player.body.velocity.y).toBe(-player.jumpPower);
    expect(player.isActiveJumpKey).toBe(true);

    pressed.clear();
    player.jump();
    expect(player.isActiveJumpKey).toBe(false);
  });

  it('toggles attack state and cooldown', () => {
    const zone = createZone();
    const pressed = new Set<number>([keys.attack]);
    const game = createGame({
      zone,
      keyboardDown: (key) => pressed.has(key),
      timeNow: 1000,
    });
    const player = new Player(game as never, 0, 0);

    player.attack();
    expect(player.attackState).toBe(true);

    game.time.now = player.attackStateAt + player.attackDuration + 1;
    player.attack();
    expect(player.attackState).toBe(false);
  });

  it('applies defense and immortal state on damage', () => {
    const hud = { updateHealthState: vi.fn() };
    const zone = createZone({ hud });
    const game = createGame({ zone });
    const player = new Player(game as never, 0, 0);
    player.defensePoints = 5;
    player.health = 10;
    const damageSpy = vi.spyOn(player, 'damage');

    player.makeDamage(3);

    expect(damageSpy).toHaveBeenCalledWith(1);
    expect(player.immortalState).toBe(true);
    expect(player.health).toBe(9);
    expect(hud.updateHealthState).toHaveBeenCalled();
  });

  // PlayerReady is covered by e2e flow.
});
