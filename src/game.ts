import { Levels, Stories } from './global-config';
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
    super(640, 480, Phaser.AUTO, 'game');

    this.state.add('boot', Boot);
    this.state.add('preload', Preload);

    this.state.add(Stories[Stories.Story1], Story1);
    this.state.add(Stories[Stories.Story2], Story2);
    this.state.add(Stories[Stories.Story3], Story3);
    this.state.add(Stories[Stories.Story4], Story4);

    this.state.add(Levels[Levels.Zone1Level1], Zone1Level1);
    this.state.add(Levels[Levels.Zone2Level1], Zone2Level1);
    this.state.add(Levels[Levels.Zone3Level1], Zone3Level1);
    this.state.add(Levels[Levels.Zone4Level1], Zone4Level1);

    this.state.add('gameOver', GameOver);

    this.state.start('boot');
  }
}
