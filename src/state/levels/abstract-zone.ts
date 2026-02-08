import type { GameObjects, Tilemaps, Types } from 'phaser';
import { Scene } from 'phaser';
import { GameEvents, GameEventType } from '../../bridge/game-events';
import { Levels, settings, Stories } from '../../global-config';
import { keys } from '../../input-config';
import {
  BlackScreen,
  BottleHP,
  BottleSuper,
  Exit,
  Flier,
  FlierCrash,
  HUD,
  IceSpike,
  PlatformHorizontal,
  PlatformVertical,
  Player,
  Runner,
  Shooter,
  ShooterReject,
  Spike,
  Transparent,
} from '../../prefab';
import { TextureKey } from '../../texture-keys';
import { PrefabSpawner } from './prefab-spawner';
import { ZoneMap } from './zone-map';

export class AbstractZone extends Scene {
  map: Tilemaps.Tilemap;
  layer: Tilemaps.TilemapLayer;
  bg: GameObjects.TileSprite;

  player: Player;
  hud: HUD;
  blackScreen: BlackScreen;

  transparents: GameObjects.Group;
  spikes: GameObjects.Group;
  iceSpikes: GameObjects.Group;
  exits: GameObjects.Group;

  platformsHorizontal: GameObjects.Group;
  platformsVertical: GameObjects.Group;

  shooters: GameObjects.Group;
  shootersReject: GameObjects.Group;
  runners: GameObjects.Group;
  fliers: GameObjects.Group;
  fliersCrash: GameObjects.Group;

  bottlesHP: GameObjects.Group;
  bottlesSuper: GameObjects.Group;

  private isPaused = false;

  constructor(config: Types.Scenes.SettingsConfig) {
    super(config);
  }

  protected get bgKey() {
    return `bg-${this.sys.settings.key}`;
  }

  preload() {
    // All in preload file
    // Don't delete this function
  }

  create() {
    settings.storage.setCurrentState(this.sys.settings.key);
    this.cameras.main.setBackgroundColor('#000000');
    GameEvents.emit(GameEventType.LevelStarted, { name: this.sys.settings.key });

    const width = Number(this.sys.game.config.width);
    const height = Number(this.sys.game.config.height);
    this.bg = this.add
      .tileSprite(0, 0, width, height, this.bgKey)
      .setOrigin(0, 0)
      .setScrollFactor(0);

    // MAP AND LAYERS
    const zoneMap = new ZoneMap(this, this.sys.settings.key);
    const { map, layer, objectLayer } = zoneMap.create();
    this.map = map;
    this.layer = layer;

    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    // PREFABS SINGLE
    // this.player = new Player(this, 120, this.map.heightInPixels - 200);
    this.player = new Player(this, 80, 600);
    this.physics.add.collider(this.player, this.layer);

    this.hud = new HUD(this, 10, 10);

    // PREFABS MULTIPLE
    const prefabSpawner = new PrefabSpawner(this, this.map, objectLayer);
    this.transparents = prefabSpawner.spawn(TextureKey.Transparent, Transparent);
    this.exits = prefabSpawner.spawn(TextureKey.Exit, Exit);
    this.spikes = prefabSpawner.spawn(TextureKey.Spike, Spike);
    this.iceSpikes = prefabSpawner.spawn(TextureKey.IceSpike, IceSpike);
    this.bottlesHP = prefabSpawner.spawn(TextureKey.BottleHp, BottleHP);
    this.bottlesSuper = prefabSpawner.spawn(TextureKey.BottleSuper, BottleSuper);
    this.shooters = prefabSpawner.spawn(TextureKey.Shooter, Shooter);
    this.shootersReject = prefabSpawner.spawn(TextureKey.ShooterReject, ShooterReject);
    this.runners = prefabSpawner.spawn(TextureKey.Runner, Runner);
    this.fliers = prefabSpawner.spawn(TextureKey.Flier, Flier);
    this.fliersCrash = prefabSpawner.spawn(TextureKey.FlierCrash, FlierCrash);
    this.platformsHorizontal = prefabSpawner.spawn(TextureKey.PlatformH, PlatformHorizontal);
    this.platformsVertical = prefabSpawner.spawn(TextureKey.PlatformV, PlatformVertical);

    // POST-SETTINGS
    this.cameras.main.startFollow(this.player);

    this.blackScreen = new BlackScreen(this, this.sys.settings.key);
    this.tweens.add({
      targets: this.blackScreen,
      alpha: 0,
      duration: 3000,
      ease: 'Linear',
      onComplete: () => {
        this.hud.alpha = 1;
      },
    });

    this.input.keyboard?.addKey(keys.pause).on('down', () => {
      this.isPaused = !this.isPaused;
      this.physics.world.isPaused = this.isPaused;
    });

    this.input.keyboard?.addKey(keys.skip).once('down', () => {
      this.startNextLevel();
    });
  }

  gameOver() {
    this.blackScreen.setText('Game Over. Reload Level.');
    this.tweens.add({
      targets: this.blackScreen,
      alpha: 1,
      duration: 3000,
      ease: 'Linear',
      onComplete: () => {
        this.scene.start(this.sys.settings.key);
      },
    });
  }

  startNextLevel() {
    settings.storage.setHealthPoints(this.player.health.toString());
    this.scene.start(this.getNextLevel());
  }

  getNextLevel() {
    switch (this.sys.settings.key) {
      case Levels[Levels.Zone1Level1]:
        return Stories[Stories.Story2];
      case Levels[Levels.Zone2Level1]:
        return Stories[Stories.Story3];
      case Levels[Levels.Zone3Level1]:
        return Stories[Stories.Story4];
      case Levels[Levels.Zone4Level1]:
        return 'gameOver';
    }
  }
}
