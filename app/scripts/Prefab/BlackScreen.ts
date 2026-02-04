import { settings } from "../GlobalConfig";
import { AbstractPrefab } from "./AbstractPrefab";

export class BlackScreen extends AbstractPrefab {
  text: Phaser.Text;

  constructor(game: Phaser.Game) {
    var blackTexture = game.add.bitmapData(game.width, game.height);
    blackTexture.ctx.beginPath();
    blackTexture.ctx.rect(0, 0, game.width, game.height);
    blackTexture.ctx.fillStyle = "#000000";
    blackTexture.ctx.fill();

    super(game, 0, 0, blackTexture);

    this.alpha = 1;
    this.fixedToCamera = true;

    this.text = game.add.text(10, game.height - 30, "", settings.font.whiteBig);
    this.addChild(this.text);
  }

  setText(text: string) {
    this.text.text = text;
  }

  update() {
    this.bringToTop();
  }
}