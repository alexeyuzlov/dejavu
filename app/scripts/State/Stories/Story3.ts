module Sample.State {
    export class Story3 extends AbstractStory {
        nextLevel: string = Levels[Levels.Zone3Level1];
        content = [
            "",
            "Целую ночь ты шел по холмам, усыпанными камнями.",
            "Когда забрезжил утренний свет, ты увидел, что тропинка поднимается в гору.",
            "Один из путников одолжил тебе коньки: «На твоём пути встретится немало горных озер!»",
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
