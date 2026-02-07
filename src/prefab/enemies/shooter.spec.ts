import { Shooter } from './shooter';
import { Bullet } from '../bullets/bullet';
import { createGame, createPlayerStub, createZone } from '../../test/phaser-mock';

describe('Shooter', () => {
  it('stops moving when off camera', () => {
    const zone = createZone();
    const game = createGame({ zone });
    const shooter = new Shooter(game as never, 0, 0);
    shooter.inCamera = false;
    shooter.body.velocity.x = 50;
    shooter.body.velocity.y = 60;

    shooter.update();

    expect(shooter.body.velocity.x).toBe(0);
    expect(shooter.body.velocity.y).toBe(0);
  });

  it('shoots a bullet toward player after delay', () => {
    const player = createPlayerStub({ x: 10 });
    const zone = createZone({ player });
    const game = createGame({ zone, timeNow: 5000 });
    const shooter = new Shooter(game as never, 100, 0);

    shooter.lastBulletShotAt = 0;
    shooter.update();

    const bullet = shooter.bullets.children[0] as Bullet;
    expect(bullet.alive).toBe(true);
    expect(bullet.body.velocity.x).toBe(-bullet.speed);
  });
});
