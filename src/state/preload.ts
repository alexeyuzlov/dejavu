import * as Prefab from "../prefab";
import { settings } from "../global-config";
import { TextureKey } from "../texture-keys";

export class Preload extends Phaser.State {
    preload() {
        const preloadBar = new Prefab.PreloadBar(
            this.game,
            this.game.world.width - 10,
            this.game.world.height - 10
        );
        this.load.setPreloadSprite(preloadBar);

        this.load.atlasXML(
            TextureKey.Player,
            "assets/images/prefabs/player/player.png",
            "assets/images/prefabs/player/player.xml"
        );

        //this.load.image('tween', 'assets/images/prefabs/tween.png');
        this.load.image(TextureKey.Tween, "assets/images/prefabs/transparent.png");
        //this.load.image('transparent', 'assets/images/prefabs/transparent-debug.png');
        this.load.image(TextureKey.Transparent, "assets/images/prefabs/transparent.png");

        this.load.image(TextureKey.Hud, "assets/images/prefabs/hud.png");
        this.load.image(TextureKey.Ground, "assets/images/ground.png");

        this.load.image(TextureKey.PlatformH, "assets/images/prefabs/platform-h.png");
        this.load.image(TextureKey.PlatformV, "assets/images/prefabs/platform-v.png");

        this.load.image(TextureKey.BottleHp, "assets/images/prefabs/bottles/bottle-hp.png");
        this.load.image(TextureKey.BottleSuper, "assets/images/prefabs/bottles/bottle-super.png");

        this.load.image(TextureKey.Exit, "assets/images/prefabs/exit.png");
        this.load.image(TextureKey.Spike, "assets/images/prefabs/spike.png");
        this.load.image(TextureKey.IceSpike, "assets/images/prefabs/ice-spike.png");

        this.load.atlasXML(
            TextureKey.Runner,
            "assets/images/prefabs/enemies/runner.png",
            "assets/images/prefabs/enemies/runner.xml"
        );

        this.load.atlasXML(
            TextureKey.Flier,
            "assets/images/prefabs/enemies/flier.png",
            "assets/images/prefabs/enemies/flier.xml"
        );
        this.load.atlasXML(
            TextureKey.FlierCrash,
            "assets/images/prefabs/enemies/flier-crash.png",
            "assets/images/prefabs/enemies/flier-crash.xml"
        );

        this.load.atlasXML(
            TextureKey.Shooter,
            "assets/images/prefabs/enemies/shooter.png",
            "assets/images/prefabs/enemies/shooter.xml"
        );
        this.load.atlasXML(
            TextureKey.ShooterReject,
            "assets/images/prefabs/enemies/shooter-reject.png",
            "assets/images/prefabs/enemies/shooter-reject.xml"
        );

        this.load.atlasXML(
            TextureKey.Boss,
            "assets/images/prefabs/enemies/boss.png",
            "assets/images/prefabs/enemies/boss.xml"
        );

        this.load.atlasXML(
            TextureKey.Egg,
            "assets/images/prefabs/bullets/egg.png",
            "assets/images/prefabs/bullets/egg.xml"
        );
        this.load.image(TextureKey.Bullet, "assets/images/prefabs/bullets/bullet.png");
        this.load.image(TextureKey.BulletReject, "assets/images/prefabs/bullets/bullet-reject.png");
    }

    create() {
        this.game.state.start(settings.storage.getCurrentState());
    }
}
