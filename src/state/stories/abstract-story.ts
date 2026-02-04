import { bindKeyDown } from '../../input';
import { addDelayedEvent, addRepeatEvent } from '../phaser-helpers';
import { secondsToMs } from '../../time';
import { settings } from '../../global-config';

export class AbstractStory extends Phaser.State {
  nextLevel: string;

  content: string[];
  text: Phaser.Text;
  index = 0;
  line = '';
  lineEvent: Phaser.TimerEvent;
  nextEvent: Phaser.TimerEvent;

  preload() {}

  create() {
    this.game.stage.backgroundColor = '#000000';

    this.text = this.game.add.text(10, 10, '', settings.font.whiteBig);
    this.text.wordWrap = true;
    this.text.wordWrapWidth = this.game.width;
    bindKeyDown(this.game, 'advance', this.skipStory, this);
    this.nextLine();
  }

  nextLine() {
    this.index++;

    if (this.index < this.content.length) {
      this.line = '';
      if (this.nextEvent) {
        this.game.time.events.remove(this.nextEvent);
        this.nextEvent = null;
      }
      this.lineEvent = addRepeatEvent(
        this.game,
        80,
        this.content[this.index].length + 1,
        this.updateLine,
        this,
      );
    } else {
      this.game.state.start(this.nextLevel);
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
      this.nextEvent = addDelayedEvent(this.game, secondsToMs(2), this.nextLine, this);
    }
  }

  skipStory() {
    if (this.lineEvent) {
      this.game.time.events.remove(this.lineEvent);
      this.lineEvent = null;
    }
    if (this.nextEvent) {
      this.game.time.events.remove(this.nextEvent);
      this.nextEvent = null;
    }
    this.game.state.start(this.nextLevel);
  }
}
