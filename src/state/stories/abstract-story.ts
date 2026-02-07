import { GameEvents, GameEventType } from '../../bridge/game-events';
import { settings } from '../../global-config';
import { keys } from '../../input-config';

export class AbstractStory extends Phaser.State {
  nextLevel: string;

  content: string[];
  text: Phaser.Text;
  index = 0;
  line = '';
  completed = false;

  preload() {
    // Phaser hook; required for Phaser to call.
  }

  create() {
    this.game.stage.backgroundColor = '#000000';

    this.text = this.game.add.text(10, 10, '', settings.font.whiteBig);
    this.text.wordWrap = true;
    this.text.wordWrapWidth = this.game.width;
    GameEvents.emit(GameEventType.StoryStarted, { name: this.game.state.current });
    this.game.input.keyboard.addKey(keys.skip).onDown.addOnce(() => this.completeStory(), this);
    this.nextLine();
  }

  nextLine() {
    this.index++;

    if (this.index < this.content.length) {
      this.line = '';
      this.game.time.events.repeat(
        80,
        this.content[this.index].length + 1,
        () => this.updateLine(),
        this,
      );
    } else {
      this.completeStory();
    }
  }

  updateLine() {
    if (this.line.length < this.content[this.index].length) {
      this.line = this.content[this.index].substr(0, this.line.length + 1);
      this.text.setText(this.line);
      GameEvents.emit(GameEventType.StoryTextProgress, {
        name: this.game.state.current,
        length: this.line.length,
      });
    } else {
      this.game.time.events.add(Phaser.Timer.SECOND * 2, () => this.nextLine(), this);
    }
  }

  completeStory() {
    if (this.completed) {
      return;
    }
    this.completed = true;
    GameEvents.emit(GameEventType.StoryCompleted, { name: this.game.state.current });
    this.game.state.start(this.nextLevel);
  }
}
