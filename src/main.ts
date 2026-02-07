import { GameCommandType, GameCommands } from './bridge/game-commands';
import { Game } from './game';
import { buildInfoMessage } from './build-info';

window.addEventListener('load', () => {
  const message = buildInfoMessage(import.meta.env.VITE_BUILD_SHA, import.meta.env.VITE_BUILD_TIME);

  if (message) {
    console.info(message);
  }

  const game = new Game();
  GameCommands.on((type, payload) => {
    switch (type) {
      case GameCommandType.StateStart:
        game.state.start(payload.name);
        break;
    }
  });
});
