import * as Phaser from 'phaser';

const buildDate = import.meta.env.VITE_BUILD_DATE;
console.info('[dev] main.ts loaded', new Date().toLocaleTimeString());

window.onload = async () => {
  window.Phaser = Phaser;

  if (buildDate) {
    console.info(`Build date: ${new Date(buildDate).toLocaleString()}`);
  }

  const { bootstrapGame } = await import('./bootstrap');
  bootstrapGame();
};

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.info('[dev] HMR update received', new Date().toLocaleTimeString());
    window.location.reload();
  });
}