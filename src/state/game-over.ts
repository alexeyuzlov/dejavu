import { addDelayedEvent, addRepeatEvent } from './phaser-helpers';
import { StateKeys, settings } from '../global-config';

export class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: StateKeys.GameOver });
  }

  content: string[] = [
    ' ',
    'Выбравшись из лабиринтов замка, твои глаза ослепил солнечный свет.',
    'Ты рад окончанию истории, приключившейся с тобой.',
    'Немного оглядевшись, ты увидел кусок бумаги под камнем.',
    'Достав ее, ты прочитал',
    'Продолжение следует...',
    ' ',
  ];
  text: Phaser.GameObjects.Text;
  index = 0;
  line = '';

  create() {
    this.cameras.main.setBackgroundColor('#000000');

    this.text = this.add.text(10, 10, '', settings.font.whiteBig);
    this.text.setWordWrapWidth(this.scale.width, true);
    this.nextLine();
  }

  nextLine() {
    this.index++;

    if (this.index < this.content.length) {
      this.line = '';
      addRepeatEvent(this, 80, this.content[this.index].length + 1, this.updateLine, this);
    } else {
      // HERE LAST ACTION
    }
  }

  updateLine() {
    if (this.line.length < this.content[this.index].length) {
      this.line = this.content[this.index].substr(0, this.line.length + 1);
      this.text.setText(this.line);
    } else {
      addDelayedEvent(this, 2 * 1000, this.nextLine, this);
    }
  }
}
