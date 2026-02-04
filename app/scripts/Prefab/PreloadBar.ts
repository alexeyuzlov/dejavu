import { AbstractPrefab } from "./AbstractPrefab";

export class PreloadBar extends AbstractPrefab {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, "preload-bar");

    this.anchor.setTo(1, 1);
  }
}