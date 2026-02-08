import {
  Boot,
  GameOver,
  Preload,
  Story1,
  Story2,
  Story3,
  Story4,
  Zone1Level1,
  Zone2Level1,
  Zone3Level1,
  Zone4Level1,
} from './state';

export class Game extends Phaser.Game {
  constructor() {
    super({
      type: Phaser.AUTO,
      width: 640,
      height: 480,
      parent: 'game',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: true,
        },
      },
      scene: [
        Boot,
        Preload,
        Story1,
        Story2,
        Story3,
        Story4,
        Zone1Level1,
        Zone2Level1,
        Zone3Level1,
        Zone4Level1,
        GameOver,
      ],
    });

    this.scene.start('boot');
  }
}
