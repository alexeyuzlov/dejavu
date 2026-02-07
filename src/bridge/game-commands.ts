import { BridgeChannels } from './bridge-shared';

// Inbound commands: tests/other app -> game.
export const GameCommandType = {
  StateStart: 'state:start',
} as const;

export type GameCommandName = (typeof GameCommandType)[keyof typeof GameCommandType];

export type GameCommandMap = {
  [GameCommandType.StateStart]: { name: string };
};

type BridgeCommand<T extends GameCommandName> = {
  type: T;
  payload: GameCommandMap[T];
};

export class GameCommands {
  static dispatch<T extends GameCommandName>(type: T, payload: GameCommandMap[T]) {
    window.dispatchEvent(
      new window.CustomEvent(BridgeChannels.GameCommand, {
        detail: { type, payload } satisfies BridgeCommand<T>,
      }),
    );
  }

  static on(handler: (type: GameCommandName, payload: GameCommandMap[GameCommandName]) => void) {
    window.addEventListener(BridgeChannels.GameCommand, (event) => {
      const { detail } = event as { detail?: BridgeCommand<GameCommandName> };
      if (!detail || !detail.type) {
        return;
      }
      handler(detail.type, detail.payload);
    });
  }
}
