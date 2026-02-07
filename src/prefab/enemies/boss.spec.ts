import { Boss } from './boss';
import { BulletReject } from '../bullets/bullet-reject';
import { createGame, createPlayerStub, createZone, createGroup } from '../../test/phaser-mock';

describe('Boss', () => {
  it('drops protection when hit by rejected bullet', () => {
    const player = createPlayerStub({ attackState: false });
    const zone = createZone({ player });
    const game = createGame({ zone });
    const bossTweens = createGroup([
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ]);
    const boss = new Boss(game as never, bossTweens as never);

    const bullet = boss.bullets.children[0] as BulletReject;
    bullet.rejectState = true;

    const playSpy = vi.spyOn(boss.animations, 'play');
    boss.update();
    game.physics.arcade.runOverlap(0);

    expect(boss.isProtect).toBe(false);
    expect(playSpy).toHaveBeenCalledWith('blue');
  });

  it('runs boom sequence with flash and lightning', () => {
    const zone = createZone();
    const game = createGame({ zone });
    const bossTweens = createGroup([
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ]);
    const boss = new Boss(game as never, bossTweens as never);

    boss.boom();

    expect(boss.lightning.alpha).toBe(1);
    expect(boss.flash.alpha).toBe(1);
  });
});
