import * as State from "./state";
import { Levels, Stories } from "./global-config";

export class Game extends Phaser.Game {
    constructor() {
        super(640, 480, Phaser.AUTO, "game");

        this.state.add("boot", State.Boot);
        this.state.add("preload", State.Preload);

        this.state.add(Stories[Stories.Story1], State.Story1);
        this.state.add(Stories[Stories.Story2], State.Story2);
        this.state.add(Stories[Stories.Story3], State.Story3);
        this.state.add(Stories[Stories.Story4], State.Story4);

        this.state.add(Levels[Levels.Zone1Level1], State.Zone1Level1);
        this.state.add(Levels[Levels.Zone2Level1], State.Zone2Level1);
        this.state.add(Levels[Levels.Zone3Level1], State.Zone3Level1);
        this.state.add(Levels[Levels.Zone4Level1], State.Zone4Level1);

        this.state.add("gameOver", State.GameOver);

        this.state.start("boot");
    }
}
