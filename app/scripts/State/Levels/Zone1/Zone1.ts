module Sample.State {
    export class Zone1 extends AbstractZone {
        bg: Phaser.TileSprite;

        preload() {
            super.preload();
            this.game.load.image("bg", "assets/images/zone1.png");
            this.game.load.spritesheet("rain", "assets/images/rain.png", 8, 8);
        }

        create() {
            this.bg = this.game.add.tileSprite(
                0,
                0,
                this.game.world.width,
                this.game.world.height,
                "bg"
            );
            this.bg.fixedToCamera = true;

            super.create();

            this.game.stage.backgroundColor = "#D7F5FF";

            this.rainCreate();
        }

        update() {
            super.update();
            this.bg.tilePosition.x -= 2;
        }

        rainCreate() {
            var emitter = this.game.add.emitter(
                this.game.world.centerX,
                -this.game.world.centerY,
                2000
            );

            emitter.width = this.game.world.width + this.game.world.width * 0.2;
            emitter.angle = 20;

            emitter.makeParticles("rain");

            emitter.minParticleScale = 0.2;
            emitter.maxParticleScale = 0.7;

            emitter.setYSpeed(100, 700);
            emitter.setXSpeed(-5, 5);

            emitter.minRotation = 0;
            emitter.maxRotation = 0;

            emitter.start(false, 10000, 5, 0);
        }
    }
}
