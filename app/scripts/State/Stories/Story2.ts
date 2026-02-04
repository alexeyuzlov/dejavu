import { Levels } from "../../GlobalConfig";
import { AbstractStory } from "./AbstractStory";

export class Story2 extends AbstractStory {
  nextLevel: string = Levels[Levels.Zone2Level1];
  content = [
    "",
    "Все как во сне: ты увидел луг и боролся за жизнь.",
    "Ты шел долго и, найдя укромное место, прилег.",
    "Над головой сгущались тучи, солнце уходило за горизонт.",
    "Стало совсем темно, но тебе поможет твое дежавю...",
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