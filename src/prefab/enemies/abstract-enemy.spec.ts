import { AbstractEnemy } from './abstract-enemy';
import { createGame, createPlayerStub, createZone } from '../../test/phaser-mock';
import { TextureKey } from '../../texture-keys';

class TestEnemy extends AbstractEnemy {
  constructor(game: Phaser.Game) {
    super(game, 0, 0, TextureKey.Runner);
  }
}

describe('AbstractEnemy', () => {
  it('applies defense reduction and sets immortal state', () => {
    const zone = createZone();
    const game = createGame({ zone });
    const enemy = new TestEnemy(game as never);
    enemy.health = 10;
    enemy.defensePoints = 5;
    const damageSpy = vi.spyOn(enemy, 'damage');

    enemy.makeDamage(3);

    expect(damageSpy).toHaveBeenCalledWith(1);
    expect(enemy.immortalState).toBe(true);
    expect(enemy.health).toBe(9);
  });

  it('updates player or enemy damage based on attack state', () => {
    const makeDamage = vi.fn();
    const player = createPlayerStub({ makeDamage, attackState: false });
    const zone = createZone({ player });
    const game = createGame({ zone });
    const enemy = new TestEnemy(game as never);

    enemy.update();
    game.physics.arcade.runOverlap();

    expect(makeDamage).toHaveBeenCalledWith(enemy.damagePoints);
  });

  it('clears immortal state after duration', () => {
    const zone = createZone();
    const game = createGame({ zone });
    const enemy = new TestEnemy(game as never);
    enemy.immortalState = true;
    enemy.immortalStateAt = Date.now() - enemy.immortalStateDuration - 1;

    enemy.update();

    expect(enemy.immortalState).toBe(false);
  });
});
