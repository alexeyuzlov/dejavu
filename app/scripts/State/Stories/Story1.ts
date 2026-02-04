import { Levels } from "../../GlobalConfig";
import { AbstractStory } from "./AbstractStory";

export class Story1 extends AbstractStory {
  nextLevel: string = Levels[Levels.Zone1Level1];
  content = [
    "",
    "Ты спишь. Видишь, как миры, будто картины, сменяют друг друга.",
    "На одной изображен летний день, на другой - кромешная ночь.",
    "Их объединяет одно: чувство ужаса и страха смерти главного героя, исходящие от картины!",
    "Ты просыпаешься. И, вместо привычных желаний, ты испытываешь дежавю...",
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