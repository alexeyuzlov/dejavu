import * as Prefab from '../../prefab';
import { Levels, StateKeys, Stories, settings } from '../../global-config';
import { bindKeyDown } from '../../input';
import { followLockonCamera } from '../phaser-helpers';
import { createLevelMap, createObjectsFromMap } from '../../tilemap';
import { addTween } from '../../tweens';

export class AbstractZone extends Phaser.State {
  map: Phaser.Tilemap;
  layer: Phaser.TilemapLayer;

  player: Prefab.Player;
  hud: Prefab.HUD;
  blackScreen: Prefab.BlackScreen;

  transparents: Phaser.Group;
  spikes: Phaser.Group;
  iceSpikes: Phaser.Group;
  exits: Phaser.Group;

  platformsHorizontal: Phaser.Group;
  platformsVertical: Phaser.Group;

  shooters: Phaser.Group;
  shootersReject: Phaser.Group;
  runners: Phaser.Group;
  fliers: Phaser.Group;
  fliersCrash: Phaser.Group;

  bottlesHP: Phaser.Group;
  bottlesSuper: Phaser.Group;

  game: Phaser.Game;

  preload() {
    // All in preload file
    // Don't delete this function
  }

  create() {
    settings.storage.setCurrentState(this.game.state.current);
    this.game.stage.backgroundColor = '#000000';

    // MAP AND LAYERS
    const levelMap = createLevelMap(this.game, 'map', 'ground', 'layer');
    this.map = levelMap.map;
    this.layer = levelMap.layer;

    // PREFABS SINGLE
    this.player = new Prefab.Player(this.game, 120, this.game.world.height - 200);

    this.hud = new Prefab.HUD(this.game, 10, 10);
    this.hud.alpha = 0;

    // PREFABS MULTIPLE
    this.transparents = this.getPrefabsFromMap('transparent', Prefab.Transparent);
    this.exits = this.getPrefabsFromMap('exit', Prefab.Exit);
    this.spikes = this.getPrefabsFromMap('spike', Prefab.Spike);
    this.iceSpikes = this.getPrefabsFromMap('ice-spike', Prefab.IceSpike);
    this.bottlesHP = this.getPrefabsFromMap('bottle-hp', Prefab.BottleHP);
    this.bottlesSuper = this.getPrefabsFromMap('bottle-super', Prefab.BottleSuper);
    this.shooters = this.getPrefabsFromMap('shooter', Prefab.Shooter);
    this.shootersReject = this.getPrefabsFromMap('shooter-reject', Prefab.ShooterReject);
    this.runners = this.getPrefabsFromMap('runner', Prefab.Runner);
    this.fliers = this.getPrefabsFromMap('flier', Prefab.Flier);
    this.fliersCrash = this.getPrefabsFromMap('flier-crash', Prefab.FlierCrash);
    this.platformsHorizontal = this.getPrefabsFromMap('platform-h', Prefab.PlatformHorizontal);
    this.platformsVertical = this.getPrefabsFromMap('platform-v', Prefab.PlatformVertical);

    // POST-SETTINGS
    followLockonCamera(this.game, this.player);

    this.blackScreen = new Prefab.BlackScreen(this.game);
    this.blackScreen.setText(this.game.state.current);
    addTween(this.game, this.blackScreen)
      .to({ alpha: 0 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true)
      .onComplete.add(() => {
        this.hud.alpha = 1;
      });

    bindKeyDown(this.game, Phaser.Keyboard.P, () => {
      this.game.paused = !this.game.paused;
    });
  }

  getPrefabsFromMap(name: string, className?: Object): Phaser.Group {
    var group = this.game.add.group();

    return createObjectsFromMap(this.map, 'objects', name, group, className);
  }

  render() {
    //this.game.debug.spriteInfo(this.player, 100, 100);
  }

  update() {
    /*
    DEBUG FEATURE

     if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
         this.blackScreen.setText("");
        addTween(this.game, this.blackScreen)
            .to({ alpha: 1 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true)
            .onComplete.add(()=> {
                this.startNextLevel();
            });
     }

    */
  }

  gameOver() {
    this.blackScreen.setText('Game Over. Reload Level.');
    addTween(this.game, this.blackScreen)
      .to({ alpha: 1 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Linear.None, true)
      .onComplete.add(() => {
        this.game.state.start(StateKeys.GameOver);
      });
  }

  startNextLevel() {
    this.blackScreen.setText(this.getNextLevel());
    addTween(this.game, this.blackScreen)
      .to({ alpha: 1 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true)
      .onComplete.add(() => {
        this.game.state.start(this.getNextLevel());
      });
  }

  getNextLevel(): string {
    switch (this.game.state.current) {
      case Levels[Levels.Zone1Level1]:
        //return Levels[Levels.Zone2Level1];
        return Stories[Stories.Story2];

      case Levels[Levels.Zone2Level1]:
        //return Levels[Levels.Zone3Level1];
        return Stories[Stories.Story3];

      case Levels[Levels.Zone3Level1]:
        //return Levels[Levels.Zone4Level1];
        return Stories[Stories.Story4];

      case Levels[Levels.Zone4Level1]:
        return StateKeys.GameOver;

      default:
        return StateKeys.GameOver;
    }
  }
}
