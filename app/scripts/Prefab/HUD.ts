module Sample.Prefab {
    export class HUD extends AbstractPrefab {
        healthState: Phaser.Text;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, "hud");

            this.fixedToCamera = true;

            var font = {
                font: "13px Arial",
                fill: "#ffffff",
            };

            this.healthState = game.add.text(14, 1, "", font);
            this.updateHealthState();
            this.addChild(this.healthState);
        }

        updateHealthState() {
            this.healthState.text = this.level.player.health.toString();
        }

        update() {}
    }
}
