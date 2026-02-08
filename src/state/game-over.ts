import { GameEvents, GameEventType } from '../bridge/game-events';
import { settings } from '../global-config';
import type { GameObjects } from 'phaser';
import { Scene } from 'phaser';

export class GameOver extends Scene {
  content: string[] = [
    ' ',
    'Выбравшись из лабиринтов замка, твои глаза ослепил солнечный свет.',
    'Ты рад окончанию истории, приключившейся с тобой.',
    'Немного оглядевшись, ты увидел кусок бумаги под камнем.',
    'Достав ее, ты прочитал',
    'Продолжение следует...',
    ' ',
  ];
  text: GameObjects.Text;
  index = 0;
  line = '';

  constructor() {
    super({ key: 'gameOver' });
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000');

    this.text = this.add.text(10, 10, '', settings.font.whiteBig);
    this.text.setWordWrapWidth(this.scale.width, true);
    GameEvents.emit(GameEventType.GameOver, {});
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
      // HERE LAST ACTION
    }
  }

  updateLine() {
    if (this.line.length < this.content[this.index].length) {
      this.line = this.content[this.index].substr(0, this.line.length + 1);
      this.text.setText(this.line);
    } else {
      this.time.delayedCall(2000, () => this.nextLine());
    }
  }
}
