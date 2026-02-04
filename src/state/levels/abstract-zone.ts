import * as Prefab from '../../prefab';
import { Levels, StateKeys, Stories, settings } from '../../global-config';
import { createGroup } from '../../groups';
import { secondsToMs } from '../../time';
import { followLockonCamera } from '../phaser-helpers';
import { createLevelMap, createObjectsFromMap, PrefabConstructor } from '../../tilemap';
import { PlayerInput } from '../../prefab/player';

export class AbstractZone extends Phaser.Scene {
  map: Phaser.Tilemaps.Tilemap;
  layer: Phaser.Tilemaps.TilemapLayer;

  player: Prefab.Player;
  hud: Prefab.HUD;
  blackScreen: Prefab.BlackScreen;
  playerInput: PlayerInput | null;
  pauseKey: Phaser.Input.Keyboard.Key | null;

  transparents: Phaser.GameObjects.Group;
  spikes: Phaser.GameObjects.Group;
  iceSpikes: Phaser.GameObjects.Group;
  exits: Phaser.GameObjects.Group;

  platformsHorizontal: Phaser.GameObjects.Group;
  platformsVertical: Phaser.GameObjects.Group;

  shooters: Phaser.GameObjects.Group;
  shootersReject: Phaser.GameObjects.Group;
  runners: Phaser.GameObjects.Group;
  fliers: Phaser.GameObjects.Group;
  fliersCrash: Phaser.GameObjects.Group;

  bottlesHP: Phaser.GameObjects.Group;
  bottlesSuper: Phaser.GameObjects.Group;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  preload() {
    // All in preload file
    // Don't delete this function
  }

  create() {
    settings.storage.setCurrentState(this.scene.key);
    this.cameras.main.setBackgroundColor('#000000');

    // MAP AND LAYERS
    const levelMap = createLevelMap(this, 'map', 'ground', 'layer');
    this.map = levelMap.map;
    this.layer = levelMap.layer;

    // PREFABS SINGLE
    this.playerInput = this.createPlayerInput();
    this.player = new Prefab.Player(this, 120, this.scale.height - 200, this.playerInput);

    this.hud = new Prefab.HUD(this, 10, 10);
    this.hud.setAlpha(0);

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
    followLockonCamera(this, this.player);

    this.blackScreen = new Prefab.BlackScreen(this);
    this.blackScreen.setText(this.scene.key);
    this.tweens.add({
      targets: this.blackScreen,
      alpha: 0,
      duration: secondsToMs(3),
      ease: 'Linear',
      onComplete: () => {
        this.hud.setAlpha(1);
      },
    });

    this.pauseKey = this.createPauseKey();
    this.pauseKey?.on('down', () => {
      const isPaused = this.physics.world.isPaused;
      this.physics.world.isPaused = !isPaused;
      this.time.timeScale = isPaused ? 1 : 0;
      if (isPaused) {
        this.anims.resumeAll();
      } else {
        this.anims.pauseAll();
      }
    });
  }

  createPlayerInput(): PlayerInput | null {
    const keyboard = this.input.keyboard;
    if (!keyboard) return null;
    return {
      cursors: keyboard.createCursorKeys(),
      jump: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
      attack: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
      left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
  }

  createPauseKey(): Phaser.Input.Keyboard.Key | null {
    const keyboard = this.input.keyboard;
    if (!keyboard) return null;
    return keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
  }

  getPrefabsFromMap(name: string, className?: PrefabConstructor): Phaser.GameObjects.Group {
    var group = createGroup(this);

    return createObjectsFromMap(this, this.map, 'objects', name, group, className);
  }

  gameOver() {
    this.blackScreen.setText('Game Over. Reload Level.');
    this.tweens.add({
      targets: this.blackScreen,
      alpha: 1,
      duration: secondsToMs(1),
      ease: 'Linear',
      onComplete: () => {
        this.scene.start(StateKeys.GameOver);
      },
    });
  }

  startNextLevel() {
    this.blackScreen.setText(this.getNextLevel());
    this.tweens.add({
      targets: this.blackScreen,
      alpha: 1,
      duration: secondsToMs(3),
      ease: 'Linear',
      onComplete: () => {
        this.scene.start(this.getNextLevel());
      },
    });
  }

  getNextLevel(): string {
    switch (this.scene.key) {
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
