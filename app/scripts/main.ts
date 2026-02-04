import { Game } from "./Game";

window.onload = () => {
  /* Check localStorage */
  (() => {
    try {
      return "localStorage" in window && window["localStorage"] !== null;
    } catch (e) {
      return false;
    }
  })();

  new Game();
};
