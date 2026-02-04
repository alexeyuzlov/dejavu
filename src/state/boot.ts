export class Boot extends Phaser.State {
  preload() {
    this.load.image('preload-bar', 'assets/images/prefabs/preload-bar.png');
  }

  create() {
    this.game.stage.backgroundColor = '#000000';
    this.game.state.start('preload');
  }
}
