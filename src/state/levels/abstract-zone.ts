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
import { TextureKey, type TextureKeyValue } from '../../texture-keys';

export class AbstractZone extends Phaser.State {
  map: Phaser.Tilemap;
  layer: Phaser.TilemapLayer;

  player: Player;
  hud: HUD;
  blackScreen: BlackScreen;

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
    GameEvents.emit(GameEventType.LevelStarted, { name: this.game.state.current });

    // MAP AND LAYERS
    this.map = this.game.add.tilemap('map');
    this.map.addTilesetImage(TextureKey.Ground);
    this.map.setCollisionBetween(1, 5);

    this.layer = this.map.createLayer('layer');
    this.layer.resizeWorld();

    // PREFABS SINGLE
    this.player = new Player(this.game, 120, this.game.world.height - 200);

    this.hud = new HUD(this.game, 10, 10);
    this.hud.alpha = 0;

    // PREFABS MULTIPLE
    this.transparents = this.getPrefabsFromMap(TextureKey.Transparent, Transparent);
    this.exits = this.getPrefabsFromMap(TextureKey.Exit, Exit);
    this.spikes = this.getPrefabsFromMap(TextureKey.Spike, Spike);
    this.iceSpikes = this.getPrefabsFromMap(TextureKey.IceSpike, IceSpike);
    this.bottlesHP = this.getPrefabsFromMap(TextureKey.BottleHp, BottleHP);
    this.bottlesSuper = this.getPrefabsFromMap(TextureKey.BottleSuper, BottleSuper);
    this.shooters = this.getPrefabsFromMap(TextureKey.Shooter, Shooter);
    this.shootersReject = this.getPrefabsFromMap(TextureKey.ShooterReject, ShooterReject);
    this.runners = this.getPrefabsFromMap(TextureKey.Runner, Runner);
    this.fliers = this.getPrefabsFromMap(TextureKey.Flier, Flier);
    this.fliersCrash = this.getPrefabsFromMap(TextureKey.FlierCrash, FlierCrash);
    this.platformsHorizontal = this.getPrefabsFromMap(TextureKey.PlatformH, PlatformHorizontal);
    this.platformsVertical = this.getPrefabsFromMap(TextureKey.PlatformV, PlatformVertical);

    // POST-SETTINGS
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);

    this.blackScreen = new BlackScreen(this.game);
    this.blackScreen.setText(this.game.state.current);
    this.game.add
      .tween(this.blackScreen)
      .to({ alpha: 0 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true)
      .onComplete.add(() => {
        this.hud.alpha = 1;
      });

    this.game.input.keyboard.addKey(keys.pause).onDown.add(() => {
      this.game.paused = !this.game.paused;
    });
  }

  getPrefabsFromMap(name: TextureKeyValue, className?: object): Phaser.Group {
    const group = this.game.add.group();

    const index = this.map.getTilesetIndex(name);

    if (className && index) {
      this.map.createFromObjects(
        'objects',
        this.map.tilesets[index].firstgid,
        name,
        0,
        true,
        false,
        group,
        className,
      );
    } else if (index) {
      this.map.createFromObjects(
        'objects',
        this.map.tilesets[index].firstgid,
        name,
        0,
        true,
        false,
        group,
      );
    }

    return group;
  }

  render() {}

  update() {}

  gameOver() {
    this.blackScreen.setText('Game Over. Reload Level.');
    this.game.add
      .tween(this.blackScreen)
      .to({ alpha: 1 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true)
      .onComplete.add(() => {
        this.game.state.start(this.game.state.current);
      });
  }

  startNextLevel() {
    settings.storage.setHealthPoints(this.player.health.toString());
    this.game.state.start(this.getNextLevel());
  }

  getNextLevel() {
    switch (this.game.state.current) {
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
