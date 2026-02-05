import { settings } from '../../global-config';

export class AbstractStory extends Phaser.Scene {
  nextLevel: string;

  content: string[];
  text: Phaser.GameObjects.Text;
  index = 0;
  line = '';
  lineEvent: Phaser.Time.TimerEvent | null = null;
  nextEvent: Phaser.Time.TimerEvent | null = null;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  preload() {}

  create() {
    this.cameras.main.setBackgroundColor('#000000');

    this.text = this.add.text(10, 10, '', settings.font.whiteBig);
    this.text.setWordWrapWidth(this.scale.width, true);
    const keyboard = this.input.keyboard;
    const advanceKey = keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    advanceKey?.on('down', this.skipStory, this);
    this.nextLine();
  }

  nextLine() {
    this.index++;

    if (this.index < this.content.length) {
      this.line = '';
      if (this.nextEvent) {
        this.time.removeEvent(this.nextEvent);
        this.nextEvent = null;
      }
      this.lineEvent = this.time.addEvent({
        delay: 80,
        repeat: Math.max(0, this.content[this.index].length),
        callback: this.updateLine,
        callbackScope: this,
      });
    } else {
      this.scene.start(this.nextLevel);
    }
  }

  updateLine() {
    if (this.line.length < this.content[this.index].length) {
      this.line = this.content[this.index].substr(0, this.line.length + 1);
      this.text.setText(this.line);
    } else {
      if (this.lineEvent) {
        this.lineEvent = null;
      }
      this.nextEvent = this.time.addEvent({
        delay: 2 * 1000,
        callback: this.nextLine,
        callbackScope: this,
      });
    }
  }

  skipStory() {
    if (this.lineEvent) {
      this.time.removeEvent(this.lineEvent);
      this.lineEvent = null;
    }
    if (this.nextEvent) {
      this.time.removeEvent(this.nextEvent);
      this.nextEvent = null;
    }
    this.scene.start(this.nextLevel);
  }
}
