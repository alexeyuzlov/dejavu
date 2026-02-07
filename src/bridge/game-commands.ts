import { BridgeChannels, getCommandSignal } from './bridge-shared';

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

// Use this to dispatch or observe commands in runtime code.
export class GameCommands {
  private static windowAttached = false;

  static dispatch<T extends GameCommandName>(type: T, payload: GameCommandMap[T]) {
    getCommandSignal().dispatch(type, payload);
    window.dispatchEvent(
      new window.CustomEvent(BridgeChannels.GameCommand, {
        detail: { type, payload } satisfies BridgeCommand<T>,
      }),
    );
  }

  static on(
    handler: <T extends GameCommandName>(type: T, payload: GameCommandMap[T]) => void,
    context?: unknown,
  ) {
    getCommandSignal().add(handler, context);
  }

  static attachWindowListeners() {
    if (GameCommands.windowAttached) {
      return;
    }

    window.addEventListener(BridgeChannels.GameCommand, (event) => {
      const detail = (event as { detail?: BridgeCommand<GameCommandName> }).detail;
      if (!detail || !detail.type) {
        return;
      }
      getCommandSignal().dispatch(detail.type, detail.payload);
    });

    GameCommands.windowAttached = true;
  }

  static clearListeners() {
    getCommandSignal().removeAll();
  }
}
