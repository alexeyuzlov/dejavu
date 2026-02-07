import { Bullet } from './bullet';
import { BulletReject } from './bullet-reject';
import { Egg } from './egg';
import { createGame, createPlayerStub, createZone } from '../../test/phaser-mock';

describe('Bullet', () => {
  it('initializes with world bounds and inactive state', () => {
    const zone = createZone();
    const game = createGame({ zone });

    const bullet = new Bullet(game as never, 0, 0);

    expect(bullet.alive).toBe(false);
    expect(bullet.checkWorldBounds).toBe(true);
    expect(bullet.outOfBoundsKill).toBe(true);
  });

  it('kills itself and damages player on collide', () => {
    const makeDamage = vi.fn();
    const player = createPlayerStub({ makeDamage });
    const zone = createZone({ player });
    const game = createGame({ zone });

    const bullet = new Bullet(game as never, 0, 0);
    bullet.revive();

    bullet.update();
    game.physics.arcade.runCollide();

    expect(bullet.alive).toBe(false);
    expect(makeDamage).toHaveBeenCalledWith(bullet.damagePoints);
  });
});

describe('BulletReject', () => {
  it('rejects when player attacks', () => {
    const player = createPlayerStub({ attackState: true });
    const zone = createZone({ player });
    const game = createGame({ zone });

    const bullet = new BulletReject(game as never, 0, 0);
    bullet.revive();
    bullet.body.velocity.x = 200;
    bullet.scale.x = 1;

    bullet.update();
    game.physics.arcade.runOverlap();

    expect(bullet.rejectState).toBe(true);
    expect(bullet.body.velocity.x).toBe(-200);
    expect(bullet.scale.x).toBe(-1);
  });

  it('damages player when not rejected', () => {
    const makeDamage = vi.fn();
    const player = createPlayerStub({ makeDamage });
    const zone = createZone({ player });
    const game = createGame({ zone });

    const bullet = new BulletReject(game as never, 0, 0);
    bullet.revive();

    bullet.update();
    game.physics.arcade.runOverlap();

    expect(bullet.alive).toBe(false);
    expect(makeDamage).toHaveBeenCalledWith(bullet.damagePoints);
  });
});

describe('Egg', () => {
  it('switches to crash state and updates body size', () => {
    const zone = createZone();
    const game = createGame({ zone });

    const egg = new Egg(game as never, 0, 0);
    egg.animations.currentFrame = { width: 25, height: 30 } as Phaser.Frame;
    egg.setEggCrash();

    expect(egg.eggCrashState).toBe(true);
    expect(egg.body.width).toBe(25);
    expect(egg.body.height).toBe(30);
  });

  it('damages player and crashes on collisions', () => {
    const makeDamage = vi.fn();
    const player = createPlayerStub({ makeDamage });
    const zone = createZone({ player });
    const game = createGame({ zone });

    const egg = new Egg(game as never, 0, 0);
    egg.revive();

    egg.update();
    game.physics.arcade.runCollide(0);
    game.physics.arcade.runCollide(1);

    expect(makeDamage).toHaveBeenCalledWith(egg.damagePoints);
    expect(egg.eggCrashState).toBe(true);
  });
});
