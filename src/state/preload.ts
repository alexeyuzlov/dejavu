import { Assets } from '../assets';
import * as Prefab from '../prefab';
import { settings } from '../global-config';

export class Preload extends Phaser.State {
  preload() {
    var preloadBar = new Prefab.PreloadBar(
      this.game,
      this.game.world.width - 10,
      this.game.world.height - 10,
    );
    this.load.setPreloadSprite(preloadBar);

    this.load.atlasXML(
      Assets.atlas.player.key,
      Assets.atlas.player.image,
      Assets.atlas.player.data,
    );

    //this.load.image('tween', 'assets/images/prefabs/tween.png');
    this.load.image(Assets.images.tween.key, Assets.images.tween.path);
    //this.load.image('transparent', 'assets/images/prefabs/transparent-debug.png');
    this.load.image(Assets.images.transparent.key, Assets.images.transparent.path);

    this.load.image(Assets.images.hud.key, Assets.images.hud.path);
    this.load.image(Assets.images.ground.key, Assets.images.ground.path);

    this.load.image(Assets.images.platformH.key, Assets.images.platformH.path);
    this.load.image(Assets.images.platformV.key, Assets.images.platformV.path);

    this.load.image(Assets.images.bottleHp.key, Assets.images.bottleHp.path);
    this.load.image(Assets.images.bottleSuper.key, Assets.images.bottleSuper.path);

    this.load.image(Assets.images.exit.key, Assets.images.exit.path);
    this.load.image(Assets.images.spike.key, Assets.images.spike.path);
    this.load.image(Assets.images.iceSpike.key, Assets.images.iceSpike.path);

    this.load.atlasXML(
      Assets.atlas.runner.key,
      Assets.atlas.runner.image,
      Assets.atlas.runner.data,
    );

    this.load.atlasXML(
      Assets.atlas.flier.key,
      Assets.atlas.flier.image,
      Assets.atlas.flier.data,
    );
    this.load.atlasXML(
      Assets.atlas.flierCrash.key,
      Assets.atlas.flierCrash.image,
      Assets.atlas.flierCrash.data,
    );

    this.load.atlasXML(
      Assets.atlas.shooter.key,
      Assets.atlas.shooter.image,
      Assets.atlas.shooter.data,
    );
    this.load.atlasXML(
      Assets.atlas.shooterReject.key,
      Assets.atlas.shooterReject.image,
      Assets.atlas.shooterReject.data,
    );

    this.load.atlasXML(
      Assets.atlas.boss.key,
      Assets.atlas.boss.image,
      Assets.atlas.boss.data,
    );

    this.load.atlasXML(
      Assets.atlas.egg.key,
      Assets.atlas.egg.image,
      Assets.atlas.egg.data,
    );
    this.load.image(Assets.images.bullet.key, Assets.images.bullet.path);
    this.load.image(Assets.images.bulletReject.key, Assets.images.bulletReject.path);
  }

  create() {
    this.game.state.start(settings.storage.getCurrentState());
  }
}
