import { BridgeChannels } from './bridge-shared';

// Outbound notifications: game -> tests/other app.
export const GameEventType = {
  StoryStarted: 'story:started',
  StoryCompleted: 'story:completed',
  StoryTextProgress: 'story:text-progress',
  LevelStarted: 'level:started',
  PlayerReady: 'player:ready',
  GameOver: 'game:over',
} as const;

export type GameEventName = (typeof GameEventType)[keyof typeof GameEventType];

export type GameEventMap = {
  [GameEventType.StoryStarted]: { name: string };
  [GameEventType.StoryCompleted]: { name: string };
  [GameEventType.StoryTextProgress]: { name: string; length: number };
  [GameEventType.LevelStarted]: { name: string };
  [GameEventType.PlayerReady]: { name: string };
  [GameEventType.GameOver]: Record<string, never>;
};

type BridgeEvent<T extends GameEventName> = {
  type: T;
  payload: GameEventMap[T];
};

export class GameEvents {
  static emit<T extends GameEventName>(type: T, payload: GameEventMap[T]) {
    window.dispatchEvent(
      new window.CustomEvent(BridgeChannels.GameEvent, {
        detail: { type, payload } satisfies BridgeEvent<T>,
      }),
    );
  }
}
