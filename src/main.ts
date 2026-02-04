import * as Phaser from 'phaser';

const buildDate = import.meta.env.VITE_BUILD_DATE;

window.onload = async () => {
  window.Phaser = Phaser;

  if (buildDate) {
    console.info(`Build date: ${new Date(buildDate).toLocaleString()}`);
  }

  const { bootstrapGame } = await import('./bootstrap');
  bootstrapGame();
};
