import { bootstrapGame } from './bootstrap';

const buildDate = import.meta.env.VITE_BUILD_DATE;

window.onload = () => {
  if (buildDate) {
    console.info(`Build date: ${new Date(buildDate).toLocaleString()}`);
  }

  bootstrapGame();
};
