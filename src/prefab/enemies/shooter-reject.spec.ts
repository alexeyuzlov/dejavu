import { ShooterReject } from './shooter-reject';
import { BulletReject } from '../bullets/bullet-reject';
import { createGame, createPlayerStub, createZone } from '../../test/phaser-mock';

describe('ShooterReject', () => {
  it('takes damage when rejected bullet overlaps', () => {
    const player = createPlayerStub();
    const zone = createZone({ player });
    const game = createGame({ zone });
    const shooter = new ShooterReject(game as never, 0, 0);
    const bullet = shooter.bullets.children[0] as BulletReject;

    bullet.rejectState = true;
    const spy = vi.spyOn(shooter, 'makeDamage');

    shooter.update();
    game.physics.arcade.runOverlap(1);

    expect(bullet.alive).toBe(false);
    expect(spy).toHaveBeenCalledWith(bullet.damageRejectPoints);
  });

  it('fires bullets after delay', () => {
    const player = createPlayerStub({ x: 100 });
    const zone = createZone({ player });
    const game = createGame({ zone, timeNow: 5000 });
    const shooter = new ShooterReject(game as never, 0, 0);
    shooter.lastBulletShotAt = 0;

    shooter.update();

    const bullet = shooter.bullets.children[0] as BulletReject;
    expect(bullet.alive).toBe(true);
  });
});
