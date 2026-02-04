# Dejavu

## Overview
Dejavu is a 2D platformer game built with the Phaser framework. Traverse through challenging levels, face enemies, and prepare for an epic boss fight at the end. Immerse yourself in this fast-paced, retro-style adventure.

## Build Instructions
To set up and build the project, follow these steps:

1. **Install dependencies**:
    ```bash
    npm install
    ```
2. **Build the project**:
    ```bash
    npm run vite:build
    ```

## Vite Build
This build outputs to `dist/`.

1. **Build to `dist/`**:
    ```bash
    npm run vite:build
    ```
2. **Watch TypeScript (rebuild `dist/js/main.js`)**:
    ```bash
    npm run vite:dev
    ```
3. **Preview the `dist/` output**:
    ```bash
    npm run vite:preview
    ```
4. **Preview and auto-open the browser**:
    ```bash
    npm run vite:preview:open
    ```
5. **Clean output**:
    ```bash
    npm run clean
    ```

Notes:
- If you change assets or `app/index.html`, re-run `npm run vite:build`.
- The build step copies `node_modules/phaser/build/phaser.min.js` into `dist/vendor/`.
- Vite requires Node 18+.

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

## Contributing
Contributions are welcome! If you want to suggest features, report bugs, or improve the game, feel free to create an issue or submit a pull request on the repository.

## License
This project is licensed under the [MIT License](LICENSE).

---
Enjoy the game and let us know your feedback!
