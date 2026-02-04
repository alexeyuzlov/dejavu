export enum Stories {
  Story1,
  Story2,
  Story3,
  Story4,
}

export enum Levels {
  Zone1Level1,
  Zone2Level1,
  Zone3Level1,
  Zone4Level1,
}

export enum Direction {
  Left,
  Right,
  Up,
  Down,
}

class Init {
  static HealthPoints = 100;
  static FirstState: string = Stories[Stories.Story1];
}

class Storage {
  private healthPoints: string;
  private currentLevel: string;

  constructor() {}

  getCurrentState(): string {
    var currentLevel = localStorage.getItem('currentLevel');
    if (currentLevel) {
      return currentLevel;
    } else {
      this.setCurrentState(Init.FirstState);
      return Init.FirstState;
    }
  }

  setCurrentState(currentState: string) {
    localStorage.setItem('currentLevel', currentState);
  }

  getHealthPoints(): string {
    var healthPoints = localStorage.getItem('healthPoints');
    if (healthPoints) {
      return healthPoints;
    } else {
      healthPoints = Init.HealthPoints.toString();
      this.setHealthPoints(healthPoints);
      return healthPoints;
    }
  }

  setHealthPoints(healthPoints: string) {
    localStorage.setItem('healthPoints', healthPoints);
  }
}

class SettingsClass {
  storage = new Storage();

  keys: any;
  font = {
    whiteWithRed: {
      font: '20px Arial',
      fill: '#ffffff',
      stroke: 'ff0000',
      strokeThickness: 2,
    },
    whiteWithBlue: {
      font: '20px Arial',
      fill: '#ffffff',
      stroke: '0000ff',
      strokeThickness: 2,
    },
    whiteWithGreen: {
      font: '20px Arial',
      fill: '#ffffff',
      stroke: '00ff00',
      strokeThickness: 2,
    },
    whiteBig: {
      font: '20px Arial',
      fill: '#ffffff',
    },
    blackBig: {
      font: '20px Arial',
      fill: '#000000',
    },
  };

  constructor() {
    this.keys = {
      moveLeft: Phaser.Keyboard.LEFT,
      moveRight: Phaser.Keyboard.RIGHT,
      jump: Phaser.Keyboard.Z,
      attack: Phaser.Keyboard.X,
    };
  }
}

export var settings: any = new SettingsClass();
