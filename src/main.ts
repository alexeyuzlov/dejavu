import { Game } from './game';
import { buildInfoMessage } from './build-info';

window.addEventListener('load', () => {
  const message = buildInfoMessage(import.meta.env.VITE_BUILD_SHA, import.meta.env.VITE_BUILD_TIME);

  if (message) {
    console.info(message);
  }

  new Game();
});
