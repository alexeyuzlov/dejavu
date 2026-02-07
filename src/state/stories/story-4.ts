import { Levels } from '../../global-config';
import { AbstractStory } from './abstract-story';

export class Story4 extends AbstractStory {
  nextLevel = Levels[Levels.Zone4Level1];
  content = [
    '',
    'Поднявшись на вершину горы, ты оказался перед замком.',
    'Страх неизвестности охватил тебя.',
    '«Вспоминая сон, только так я смогу, наконец, выбраться отсюда!» - собрав все мужество, ты двинулся вперед...',
  ];
}
