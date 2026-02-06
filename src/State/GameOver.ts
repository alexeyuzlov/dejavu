import { settings } from "../GlobalConfig";

export class GameOver extends Phaser.State {
    content: string[] = [
        " ",
        "Выбравшись из лабиринтов замка, твои глаза ослепил солнечный свет.",
        "Ты рад окончанию истории, приключившейся с тобой.",
        "Немного оглядевшись, ты увидел кусок бумаги под камнем.",
        "Достав ее, ты прочитал",
        "Продолжение следует...",
        " ",
    ];
    text: Phaser.Text;
    index = 0;
    line = "";

    create() {
        this.game.stage.backgroundColor = "#000000";

        this.text = this.game.add.text(10, 10, "", settings.font.whiteBig);
        this.text.wordWrap = true;
        this.text.wordWrapWidth = this.game.width;
        this.nextLine();
    }

    nextLine() {
        this.index++;

        if (this.index < this.content.length) {
            this.line = "";
            this.game.time.events.repeat(
                80,
                this.content[this.index].length + 1,
                () => this.updateLine(),
                this
            );
        } else {
            // HERE LAST ACTION
        }
    }

    updateLine() {
        if (this.line.length < this.content[this.index].length) {
            this.line = this.content[this.index].substr(0, this.line.length + 1);
            this.text.setText(this.line);
        } else {
            this.game.time.events.add(Phaser.Timer.SECOND * 2, () => this.nextLine(), this);
        }
    }
}
