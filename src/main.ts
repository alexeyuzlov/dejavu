import { Game } from './game';

window.onload = () => {
  /* Check localStorage */
  (() => {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  })();

  new Game();
};
