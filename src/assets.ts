export const Assets = {
  atlas: {
    player: {
      key: 'player',
      image: 'assets/images/prefabs/player/player.png',
      data: 'assets/images/prefabs/player/player.xml',
    },
    runner: {
      key: 'runner',
      image: 'assets/images/prefabs/enemies/runner.png',
      data: 'assets/images/prefabs/enemies/runner.xml',
    },
    flier: {
      key: 'flier',
      image: 'assets/images/prefabs/enemies/flier.png',
      data: 'assets/images/prefabs/enemies/flier.xml',
    },
    flierCrash: {
      key: 'flier-crash',
      image: 'assets/images/prefabs/enemies/flier-crash.png',
      data: 'assets/images/prefabs/enemies/flier-crash.xml',
    },
    shooter: {
      key: 'shooter',
      image: 'assets/images/prefabs/enemies/shooter.png',
      data: 'assets/images/prefabs/enemies/shooter.xml',
    },
    shooterReject: {
      key: 'shooter-reject',
      image: 'assets/images/prefabs/enemies/shooter-reject.png',
      data: 'assets/images/prefabs/enemies/shooter-reject.xml',
    },
    boss: {
      key: 'boss',
      image: 'assets/images/prefabs/enemies/boss.png',
      data: 'assets/images/prefabs/enemies/boss.xml',
    },
    egg: {
      key: 'egg',
      image: 'assets/images/prefabs/bullets/egg.png',
      data: 'assets/images/prefabs/bullets/egg.xml',
    },
  },
  images: {
    tween: { key: 'tween', path: 'assets/images/prefabs/transparent.png' },
    transparent: { key: 'transparent', path: 'assets/images/prefabs/transparent.png' },
    hud: { key: 'hud', path: 'assets/images/prefabs/hud.png' },
    ground: { key: 'ground', path: 'assets/images/ground.png' },
    platformH: { key: 'platform-h', path: 'assets/images/prefabs/platform-h.png' },
    platformV: { key: 'platform-v', path: 'assets/images/prefabs/platform-v.png' },
    bottleHp: { key: 'bottle-hp', path: 'assets/images/prefabs/bottles/bottle-hp.png' },
    bottleSuper: {
      key: 'bottle-super',
      path: 'assets/images/prefabs/bottles/bottle-super.png',
    },
    exit: { key: 'exit', path: 'assets/images/prefabs/exit.png' },
    spike: { key: 'spike', path: 'assets/images/prefabs/spike.png' },
    iceSpike: { key: 'ice-spike', path: 'assets/images/prefabs/ice-spike.png' },
    bullet: { key: 'bullet', path: 'assets/images/prefabs/bullets/bullet.png' },
    bulletReject: {
      key: 'bullet-reject',
      path: 'assets/images/prefabs/bullets/bullet-reject.png',
    },
    zone1: { key: 'bg', path: 'assets/images/zone1.png' },
    zone2: { key: 'bg', path: 'assets/images/zone2.png' },
    zone3: { key: 'bg', path: 'assets/images/zone3.png' },
    zone4: { key: 'bg', path: 'assets/images/zone4.jpg' },
  },
  spritesheets: {
    rain: { key: 'rain', path: 'assets/images/rain.png', frameWidth: 8, frameHeight: 8 },
    snowflake: {
      key: 'snowflake',
      path: 'assets/images/snowflake.png',
      frameWidth: 16,
      frameHeight: 16,
    },
  },
  tilemaps: {
    key: 'map',
    zone1: 'assets/levels/1-1.json',
    zone2: 'assets/levels/2-1.json',
    zone3: 'assets/levels/3-1.json',
    zone4: 'assets/levels/4-1.json',
  },
};
