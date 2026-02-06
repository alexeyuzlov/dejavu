module Sample.State {
    export class Zone3Level1 extends Zone3 {
        preload() {
            super.preload();
            this.game.load.tilemap(
                "map",
                "assets/levels/3-1.json",
                null,
                Phaser.Tilemap.TILED_JSON
            );
        }

        create() {
            super.create();

            this.player.y = 100;
        }

        update() {
            super.update();
        }
    }
}
