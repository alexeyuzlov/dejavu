# Dejavu

## Overview
Dejavu is a 2D platformer game built with the Phaser framework. Traverse through challenging levels, face enemies, and prepare for an epic boss fight at the end. Immerse yourself in this fast-paced, retro-style adventure.

## Build Instructions
To set up and build the project, follow these steps:

1. **Install dependencies**:
    ```bash
    npm install
    ```
2. **Install Bower components**:
    ```bash
    npx bower install
    ```
3. **Build the project**:
    ```bash
    npx grunt
    ```

## Parallel Vite Build (Experimental)
This optional path builds to a separate folder to compare with the Grunt output.

1. **Build to `build-vite/`**:
    ```bash
    npm run vite:build
    ```
2. **Watch TypeScript (rebuild `build-vite/js/main.js`)**:
    ```bash
    npm run vite:dev
    ```
3. **Preview the `build-vite/` output**:
    ```bash
    npm run vite:preview
    ```
4. **Preview and auto-open the browser**:
    ```bash
    npm run vite:preview:open
    ```

Notes:
- If you change assets or `app/index.html`, re-run `npm run vite:build`.

## Game Features
- Classic platformer mechanics.
- Multi-level progression with increasing difficulty.
- A final boss challenge to test your skills.
- Retro-inspired visuals and engaging gameplay.

## Controls
- **Left / Right Arrows**: Move left/right.
- **Z**: Jump.
- **X**: Attack.
- **P**: Pause.

## Credits
This game was made possible with the following tools and resources:

- [Phaser Framework](http://phaser.io): The game engine used for development.
- [Yeoman generator-phaser-typescript](https://github.com/rcolinray/generator-phaser-typescript): For scaffolding the project.
- [Game Mechanic Explorer](http://gamemechanicexplorer.com/): For inspiration and game design patterns.
- [TypeScript](http://www.typescriptlang.org): For writing robust and maintainable code.
- [Tiled Map Editor](http://www.mapeditor.org): For creating intricate level designs.
- [ShoeBox](http://renderhjs.net/shoebox): For sprite sheet generation and asset management.
- [stats.js](https://github.com/mrdoob/stats.js): For performance monitoring.

## Contributing
Contributions are welcome! If you want to suggest features, report bugs, or improve the game, feel free to create an issue or submit a pull request on the repository.

## License
This project is licensed under the [MIT License](LICENSE).

---
Enjoy the game and let us know your feedback!
