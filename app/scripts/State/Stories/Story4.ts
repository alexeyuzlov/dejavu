module Sample.State {

    export class Story4 extends AbstractStory {
        nextLevel: string = Levels[Levels.Zone4Level1];
        content = [
            '',
            'Поднявшись на вершину горы, ты оказался перед замком.',
            'Страх неизвестности охватил тебя.',
            '«Вспоминая сон, только так я смогу, наконец, выбраться отсюда!» - собрав все мужество, ты двинулся вперед...'
        ];

        preload() {
            super.preload();
        }

        create() {
            super.create();
        }

        update() {
            super.update();
        }
    }
}