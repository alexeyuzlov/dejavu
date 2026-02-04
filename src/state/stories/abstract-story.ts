import { bindKeyDown } from '../../input';
import { addDelayedEvent, addRepeatEvent } from '../phaser-helpers';
import { secondsToMs } from '../../time';
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
    bindKeyDown(this, 'advance', this.skipStory, this);
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
      this.lineEvent = addRepeatEvent(
        this,
        80,
        this.content[this.index].length + 1,
        this.updateLine,
        this,
      );
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
      this.nextEvent = addDelayedEvent(this, secondsToMs(2), this.nextLine, this);
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
