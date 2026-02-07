type Callback<TArgs extends unknown[] = unknown[]> = (...args: TArgs) => void;

export type FakeText = {
  text: string;
  destroy: () => void;
};

export type FakeTween = {
  to: (..._args: unknown[]) => FakeTween;
  start: () => FakeTween;
  onComplete: { add: (callback: Callback) => void };
  complete: () => void;
};

export type FakeGroup = {
  children: unknown[];
  add: (child: unknown) => void;
  getFirstDead: () => unknown | undefined;
};

export type FakeBody = {
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: { x: number; y: number; setTo: (x: number, y: number) => void };
  gravity: { y: number };
  acceleration: { x: number; y: number };
  drag: { x: number; y: number };
  maxVelocity: { x: number; y: number };
  blocked: { left: boolean; right: boolean; down: boolean };
  touching: { down: boolean };
  immovable: boolean;
  moves: boolean;
  collideWorldBounds: boolean;
};

export type FakeGame = {
  width: number;
  height: number;
  world: { width: number; height: number };
  time: { now: number; pauseDuration: number };
  input: { keyboard: { isDown: (key: number) => boolean } };
  physics: {
    arcade: {
      overlaps: Array<{
        obj1: unknown;
        obj2: unknown;
        callback?: Callback;
        process?: Callback<[unknown, unknown]>;
      }>;
      collides: Array<{
        obj1: unknown;
        obj2: unknown;
        callback?: Callback;
        process?: Callback<[unknown, unknown]>;
      }>;
      enabled: unknown[];
      enable: (obj: unknown) => void;
      overlap: (obj1: unknown, obj2: unknown, callback?: Callback, process?: Callback) => void;
      collide: (obj1: unknown, obj2: unknown, callback?: Callback, process?: Callback) => void;
      runOverlap: (index?: number) => void;
      runCollide: (index?: number) => void;
      runAllOverlaps: () => void;
      runAllCollides: () => void;
    };
  };
  add: {
    existing: (obj: unknown) => void;
    text: (x: number, y: number, text: string, style: Record<string, unknown>) => FakeText;
    tween: (target: unknown) => FakeTween;
    group: () => FakeGroup;
    bitmapData: (
      width: number,
      height: number,
    ) => {
      width: number;
      height: number;
      ctx: Record<string, unknown>;
      context: Record<string, unknown>;
      dirty: boolean;
    };
    image: (
      x: number,
      y: number,
      data: unknown,
    ) => {
      x: number;
      y: number;
      data: unknown;
      anchor: { setTo: (x: number, y: number) => void };
      fixedToCamera: boolean;
      alpha: number;
      rotation: number;
    };
    graphics: (
      x: number,
      y: number,
    ) => {
      x: number;
      y: number;
      alpha: number;
      fixedToCamera: boolean;
      beginFill: Callback;
      drawRect: Callback;
      endFill: Callback;
    };
  };
  rnd: { integerInRange: (min: number, max: number) => number };
  onResume: { callbacks: Callback[]; add: (callback: Callback) => void };
  state: { current: string; getCurrentState: () => unknown };
};

export type PlayerStub = {
  attackState: boolean;
  damagePoints: number;
  health: number;
  x: number;
  y: number;
  width: number;
  body: { height: number };
  getHP: (amount: number) => void;
  immortal: (duration: number) => void;
  makeDamage: (amount: number) => void;
};

export type ZoneStub = {
  player: PlayerStub;
  layer: unknown;
  transparents: FakeGroup;
  exits: FakeGroup;
  hud: { updateHealthState: () => void };
  blackScreen: { alpha: number };
  startNextLevel: () => void;
  gameOver: () => void;
};

export class FakeSprite {
  game: FakeGame;
  x: number;
  y: number;
  width = 10;
  height = 10;
  alpha = 1;
  health = 1;
  alive = true;
  inCamera = true;
  fixedToCamera = false;
  body: FakeBody;
  anchor = {
    x: 0,
    y: 0,
    set: (x: number, y: number) => (this.anchor = { ...this.anchor, x, y }),
    setTo: (x: number, y: number) => (this.anchor = { ...this.anchor, x, y }),
  };
  scale = { x: 1, y: 1 };
  animations = {
    currentFrame: { width: 10, height: 10 },
    lastPlayed: '',
    add: (_name: string, _frames: string[], _rate: number, _loop: boolean) => {},
    play: (name: string) => {
      this.animations.lastPlayed = name;
    },
  };
  events = {
    onKilled: {
      callbacks: [] as Callback[],
      add: (callback: Callback) => {
        this.events.onKilled.callbacks.push(callback);
      },
    },
  };
  lastDamage = 0;

  constructor(game: FakeGame, x: number, y: number, _texture: unknown) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.body = createBody(x, y);
  }

  addChild(_child: unknown) {}

  bringToTop() {}

  kill() {
    this.alive = false;
    this.events.onKilled.callbacks.forEach((callback) => callback());
  }

  revive() {
    this.alive = true;
  }

  reset(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  damage(amount: number) {
    this.health -= amount;
    this.lastDamage = amount;
  }
}

const createBody = (x: number, y: number): FakeBody => ({
  x,
  y,
  width: 10,
  height: 10,
  velocity: {
    x: 0,
    y: 0,
    setTo(xValue: number, yValue: number) {
      this.x = xValue;
      this.y = yValue;
    },
  },
  gravity: { y: 0 },
  acceleration: { x: 0, y: 0 },
  drag: { x: 0, y: 0 },
  maxVelocity: { x: 0, y: 0 },
  blocked: { left: false, right: false, down: false },
  touching: { down: false },
  immovable: false,
  moves: true,
  collideWorldBounds: false,
});

const createTween = (): FakeTween => {
  const callbacks: Callback[] = [];
  return {
    to() {
      return this;
    },
    start() {
      return this;
    },
    onComplete: {
      add(callback: Callback) {
        callbacks.push(callback);
      },
    },
    complete() {
      callbacks.forEach((callback) => callback());
    },
  };
};

export const createGroup = (children: unknown[] = []): FakeGroup => ({
  children,
  add(child: unknown) {
    this.children.push(child);
  },
  getFirstDead() {
    return this.children.find((child) => (child as { alive?: boolean }).alive === false);
  },
});

export const createPlayerStub = (overrides: Partial<PlayerStub> = {}): PlayerStub => ({
  attackState: false,
  damagePoints: 10,
  health: 100,
  x: 0,
  y: 0,
  width: 10,
  body: { height: 10 },
  getHP: () => {},
  immortal: () => {},
  makeDamage: () => {},
  ...overrides,
});

export const createZone = (overrides: Partial<ZoneStub> = {}): ZoneStub => {
  const player = overrides.player ?? createPlayerStub();
  return {
    player,
    layer: {},
    transparents: createGroup(),
    exits: createGroup(),
    hud: { updateHealthState: () => {} },
    blackScreen: { alpha: 0 },
    startNextLevel: () => {},
    gameOver: () => {},
    ...overrides,
  };
};

export const createGame = (
  options: {
    zone?: ZoneStub;
    width?: number;
    height?: number;
    timeNow?: number;
    pauseDuration?: number;
    keyboardDown?: (key: number) => boolean;
    stateName?: string;
  } = {},
): FakeGame => {
  const zone = options.zone ?? createZone();
  const arcade = {
    overlaps: [] as FakeGame['physics']['arcade']['overlaps'],
    collides: [] as FakeGame['physics']['arcade']['collides'],
    enabled: [] as unknown[],
    enable(obj: unknown) {
      if ((obj as { body?: FakeBody }).body === undefined) {
        (obj as { body?: FakeBody }).body = createBody(0, 0);
      }
      this.enabled.push(obj);
    },
    overlap(obj1: unknown, obj2: unknown, callback?: Callback, process?: Callback) {
      this.overlaps.push({ obj1, obj2, callback, process });
    },
    collide(obj1: unknown, obj2: unknown, callback?: Callback, process?: Callback) {
      this.collides.push({ obj1, obj2, callback, process });
    },
    runOverlap(index = 0) {
      const entry = this.overlaps[index];
      if (!entry || !entry.callback) return;
      const obj2 =
        entry.obj2 && (entry.obj2 as FakeGroup).children
          ? (entry.obj2 as FakeGroup).children[0]
          : entry.obj2;
      entry.callback(entry.obj1, obj2);
    },
    runCollide(index = 0) {
      const entry = this.collides[index];
      if (!entry) return;
      const obj2 =
        entry.obj2 && (entry.obj2 as FakeGroup).children
          ? (entry.obj2 as FakeGroup).children[0]
          : entry.obj2;
      if (entry.process && !entry.process(entry.obj1, obj2)) return;
      if (!entry.callback) return;
      entry.callback(entry.obj1, obj2);
    },
    runAllOverlaps() {
      this.overlaps.forEach((_entry, index) => this.runOverlap(index));
    },
    runAllCollides() {
      this.collides.forEach((_entry, index) => this.runCollide(index));
    },
  };

  const textFactory = (_x: number, _y: number, text: string, _style: Record<string, unknown>) => ({
    text,
    destroy: () => {},
  });

  const bitmapDataFactory = (width: number, height: number) => {
    const ctx = {
      beginPath: () => {},
      rect: () => {},
      fill: () => {},
      clearRect: () => {},
      moveTo: () => {},
      lineTo: () => {},
      stroke: () => {},
      set strokeStyle(_value: string) {},
      set lineWidth(_value: number) {},
      set fillStyle(_value: string) {},
    };
    return { width, height, ctx, context: ctx, dirty: false };
  };

  const game: FakeGame = {
    width: options.width ?? 640,
    height: options.height ?? 480,
    world: { width: options.width ?? 640, height: options.height ?? 480 },
    time: { now: options.timeNow ?? 0, pauseDuration: options.pauseDuration ?? 0 },
    input: { keyboard: { isDown: options.keyboardDown ?? (() => false) } },
    physics: { arcade },
    add: {
      existing: () => {},
      text: textFactory,
      tween: () => createTween(),
      group: () => createGroup(),
      bitmapData: bitmapDataFactory,
      image: (x: number, y: number, data: unknown) => ({
        x,
        y,
        data,
        anchor: { setTo: (_x: number, _y: number) => {} },
        fixedToCamera: false,
        alpha: 1,
        rotation: 0,
      }),
      graphics: (x: number, y: number) => ({
        x,
        y,
        alpha: 0,
        fixedToCamera: false,
        beginFill: () => {},
        drawRect: () => {},
        endFill: () => {},
      }),
    },
    rnd: {
      integerInRange(min: number, max: number) {
        return Math.floor((min + max) / 2);
      },
    },
    onResume: {
      callbacks: [],
      add(callback: Callback) {
        this.callbacks.push(callback);
      },
    },
    state: {
      current: options.stateName ?? 'test-state',
      getCurrentState: () => zone,
    },
  };

  return game;
};

export const installPhaserMockGlobal = () => {
  const PhaserGlobal = {
    AUTO: 0,
    Keyboard: {
      LEFT: 37,
      RIGHT: 39,
      Z: 90,
      X: 88,
      P: 80,
      SPACEBAR: 32,
    },
    Timer: {
      SECOND: 1000,
    },
    Animation: {
      generateFrameNames(
        prefix: string,
        start: number,
        end: number,
        suffix: string,
        _zeroPad: number,
      ) {
        const frames: string[] = [];
        for (let i = start; i <= end; i += 1) {
          frames.push(`${prefix}${i}${suffix}`);
        }
        return frames;
      },
    },
    Easing: {
      Linear: { None: 'linear-none' },
      Quadratic: { In: 'quadratic-in' },
      Bounce: { Out: 'bounce-out' },
      Cubic: { In: 'cubic-in' },
    },
    Math: {
      distance(x1: number, y1: number, x2: number, y2: number) {
        return Math.hypot(x2 - x1, y2 - y1);
      },
      angleBetween(x1: number, y1: number, x2: number, y2: number) {
        return Math.atan2(y2 - y1, x2 - x1);
      },
    },
    Utils: {
      chanceRoll(_chance: number) {
        return false;
      },
    },
    Sprite: FakeSprite,
    Group: class {
      children: unknown[] = [];
    },
  };

  (globalThis as { Phaser?: unknown }).Phaser = PhaserGlobal;
};

export const installWindowMock = () => {
  (globalThis as { window?: unknown }).window = {
    dispatchEvent: () => true,
    addEventListener: () => {},
    CustomEvent: class {
      detail?: unknown;
      constructor(_type: string, init?: { detail?: unknown }) {
        this.detail = init?.detail;
      }
    },
  };
};

export const installLocalStorageMock = () => {
  const store = new Map<string, string>();
  (globalThis as { localStorage?: unknown }).localStorage = {
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
    removeItem(key: string) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
  };
};
