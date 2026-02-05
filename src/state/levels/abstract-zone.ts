import * as Prefab from '../../prefab';
import { Levels, StateKeys, Stories, settings } from '../../global-config';
import { PlayerInput } from '../../prefab/player';

type PrefabConstructor = new (
  scene: Phaser.Scene,
  x: number,
  y: number,
  ...args: any[]
) => Phaser.GameObjects.GameObject;

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
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('ground');
    const layer = map.createLayer('layer', tileset, 0, 0);
    map.setCollisionBetween(1, 5, true, true, layer);
    layer.setCollisionBetween(1, 5);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBoundsCollision(true, true, true, true);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.map = map;
    this.layer = layer;

    // PREFABS SINGLE
    this.playerInput = this.createPlayerInput();
    this.player = new Prefab.Player(this, 120, map.heightInPixels - 200, this.playerInput);

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

    this.physics.add.collider(this.player, this.layer);
    this.physics.add.collider(this.runners, this.layer);
    this.physics.add.collider(this.shooters, this.layer);
    this.physics.add.collider(this.shootersReject, this.layer);
    this.physics.add.collider(this.player, this.platformsHorizontal);
    this.physics.add.collider(this.player, this.platformsVertical);
    this.physics.add.collider(this.runners, this.platformsHorizontal);
    this.physics.add.collider(this.runners, this.platformsVertical);
    this.physics.add.collider(this.shooters, this.platformsHorizontal);
    this.physics.add.collider(this.shooters, this.platformsVertical);
    this.physics.add.collider(this.shootersReject, this.platformsHorizontal);
    this.physics.add.collider(this.shootersReject, this.platformsVertical);

    // POST-SETTINGS
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    this.blackScreen = new Prefab.BlackScreen(this);
    this.blackScreen.setText(this.scene.key);
    this.tweens.add({
      targets: this.blackScreen,
      alpha: 0,
      duration: 3 * 1000,
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
        this.events.emit(Phaser.Scenes.Events.RESUME);
      } else {
        this.anims.pauseAll();
        this.events.emit(Phaser.Scenes.Events.PAUSE);
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
    const group = this.add.group();
    const tilesetIndex = this.map.getTilesetIndex(name);
    if (tilesetIndex === null || tilesetIndex === -1) return group;

    const firstGid = this.map.tilesets[tilesetIndex]?.firstgid;
    if (firstGid === undefined) return group;

    const config: Phaser.Types.Tilemaps.CreateFromObjectLayerConfig = {
      gid: firstGid,
      key: name,
      scene: this,
    };

    if (className) {
      config.classType =
        className as unknown as Phaser.Types.Tilemaps.CreateFromObjectsClassTypeConstructor;
    }

    const objects = this.map.createFromObjects('objects', config);
    if (objects.length) {
      objects.forEach((object) => {
        const sprite = object as Phaser.GameObjects.Sprite;
        if (sprite.setOrigin) {
          sprite.setOrigin(0, 1);
        }
      });
      group.addMultiple(objects);
    }
    return group;
  }

  gameOver() {
    this.blackScreen.setText('Game Over. Reload Level.');
    this.tweens.add({
      targets: this.blackScreen,
      alpha: 1,
      duration: 1 * 1000,
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
      duration: 3 * 1000,
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
