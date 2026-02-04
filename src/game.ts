import * as State from './state';

export const createGame = () =>
  new Phaser.Game({
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    parent: 'game',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: false,
      },
    },
    scene: [
      State.Boot,
      State.Preload,
      State.Story1,
      State.Story2,
      State.Story3,
      State.Story4,
      State.Zone1Level1,
      State.Zone2Level1,
      State.Zone3Level1,
      State.Zone4Level1,
      State.GameOver,
    ],
  });
