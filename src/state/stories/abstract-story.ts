import { GameEvents, GameEventType } from '../../bridge/game-events';
import { settings } from '../../global-config';
import { keys } from '../../input-config';
import type { GameObjects, Types } from 'phaser';
import { Scene } from 'phaser';

export class AbstractStory extends Scene {
  nextLevel: string;

  content: string[];
  text: GameObjects.Text;
  index = 0;
  line = '';
  completed = false;

  constructor(config: Types.Scenes.SettingsConfig) {
    super(config);
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000');

    this.text = this.add.text(10, 10, '', settings.font.whiteBig);
    this.text.setWordWrapWidth(this.scale.width, true);
    GameEvents.emit(GameEventType.StoryStarted, { name: this.sys.settings.key });
    this.input.keyboard?.addKey(keys.skip).once('down', () => this.completeStory());
    this.nextLine();
  }

  nextLine() {
    this.index++;

    if (this.index < this.content.length) {
      this.line = '';
      this.time.addEvent({
        delay: 80,
        repeat: this.content[this.index].length,
        callback: () => this.updateLine(),
        callbackScope: this,
      });
    } else {
      this.completeStory();
    }
  }

  updateLine() {
    if (this.line.length < this.content[this.index].length) {
      this.line = this.content[this.index].substr(0, this.line.length + 1);
      this.text.setText(this.line);
      GameEvents.emit(GameEventType.StoryTextProgress, {
        name: this.sys.settings.key,
        length: this.line.length,
      });
    } else {
      this.time.delayedCall(2000, () => this.nextLine());
    }
  }

  completeStory() {
    if (this.completed) {
      return;
    }
    this.completed = true;
    GameEvents.emit(GameEventType.StoryCompleted, { name: this.sys.settings.key });
    this.scene.start(this.nextLevel);
  }
}
