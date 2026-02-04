/// <reference path="../../node_modules/phaser/build/phaser.d.ts"/>

/// <reference path='State/Boot.ts'/>
/// <reference path='State/Preload.ts'/>

/// <reference path='State/Stories/AbstractStory.ts'/>
/// <reference path='State/Stories/Story1.ts'/>
/// <reference path='State/Stories/Story2.ts'/>
/// <reference path='State/Stories/Story3.ts'/>
/// <reference path='State/Stories/Story4.ts'/>

/// <reference path='State/Levels/AbstractZone.ts'/>

/// <reference path='State/Levels/Zone1/Zone1.ts'/>
/// <reference path='State/Levels/Zone1/Level1.ts'/>

/// <reference path='State/Levels/Zone2/Zone2.ts'/>
/// <reference path='State/Levels/Zone2/Level1.ts'/>

/// <reference path='State/Levels/Zone3/Zone3.ts'/>
/// <reference path='State/Levels/Zone3/Level1.ts'/>

/// <reference path='State/Levels/Zone4/Zone4.ts'/>
/// <reference path='State/Levels/Zone4/Level1.ts'/>

/// <reference path='State/GameOver.ts'/>

/// <reference path='Prefab/AbstractPrefab.ts'/>
/// <reference path='Prefab/Player.ts'/>
/// <reference path='Prefab/HUD.ts'/>
/// <reference path='Prefab/BlackScreen.ts'/>
/// <reference path='Prefab/PreloadBar.ts'/>

/// <reference path='Prefab/Transparent.ts'/>

/// <reference path='Prefab/Spike.ts'/>
/// <reference path='Prefab/IceSpike.ts'/>
/// <reference path='Prefab/Exit.ts'/>

/// <reference path='Prefab/Platforms/Platform.ts'/>
/// <reference path='Prefab/Platforms/PlatformHorizontal.ts'/>
/// <reference path='Prefab/Platforms/PlatformVertical.ts'/>

/// <reference path='Prefab/Bottles/Bottle.ts'/>
/// <reference path='Prefab/Bottles/BottleHP.ts'/>
/// <reference path='Prefab/Bottles/BottleSuper.ts'/>

/// <reference path='Prefab/Enemies/AbstractEnemy.ts'/>
/// <reference path='Prefab/Enemies/Runner.ts'/>
/// <reference path='Prefab/Enemies/Flier.ts'/>
/// <reference path='Prefab/Enemies/FlierCrash.ts'/>
/// <reference path='Prefab/Enemies/Shooter.ts'/>
/// <reference path='Prefab/Enemies/ShooterReject.ts'/>
/// <reference path='Prefab/Enemies/Boss.ts'/>

/// <reference path='Prefab/Bullets/Egg.ts'/>
/// <reference path='Prefab/Bullets/Bullet.ts'/>
/// <reference path='Prefab/Bullets/BulletReject.ts'/>

module Sample {

    export enum Stories {
        Story1, Story2, Story3, Story4
    }

    export enum Levels {
        Zone1Level1, Zone2Level1, Zone3Level1, Zone4Level1
    }

    export enum Direction {
        Left,
        Right,
        Up,
        Down
    }

    class Init {
        static HealthPoints = 100;
        static FirstState: string = Stories[Stories.Story1];
    }

    class Storage {
        private healthPoints:string;
        private currentLevel:string;

        constructor() {}

        getCurrentState():string {
            var currentLevel = localStorage.getItem('currentLevel');
            if (currentLevel) {
                return currentLevel;
            } else {
                this.setCurrentState(Init.FirstState);
                return Init.FirstState;
            }
        }

        setCurrentState(currentState:string) {
            localStorage.setItem('currentLevel', currentState);
        }

        getHealthPoints():string {
            var healthPoints = localStorage.getItem('healthPoints');
            if (healthPoints) {
                return healthPoints;
            } else {
                healthPoints = Init.HealthPoints.toString();
                this.setHealthPoints(healthPoints);
                return healthPoints;
            }
        }

        setHealthPoints(healthPoints:string) {
            localStorage.setItem('healthPoints', healthPoints);
        }
    }

    class SettingsClass {
        storage = new Storage();

        keys:any;
        font = {
            whiteWithRed: {
                font: "20px Arial",
                fill: "#ffffff",
                stroke: "ff0000",
                strokeThickness: 2
            },
            whiteWithBlue: {
                font: "20px Arial",
                fill: "#ffffff",
                stroke: "0000ff",
                strokeThickness: 2
            },
            whiteWithGreen: {
                font: "20px Arial",
                fill: "#ffffff",
                stroke: "00ff00",
                strokeThickness: 2
            },
            whiteBig: {
                font: "20px Arial",
                fill: "#ffffff"
            },
            blackBig: {
                font: "20px Arial",
                fill: "#000000"
            }
        };

        constructor() {
            this.keys = {
                moveLeft: Phaser.Keyboard.LEFT,
                moveRight: Phaser.Keyboard.RIGHT,
                jump: Phaser.Keyboard.Z,
                attack: Phaser.Keyboard.X
            }
        }
    }

    export var settings:any = new SettingsClass();
}
