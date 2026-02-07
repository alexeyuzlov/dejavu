// Shared channel names for browser CustomEvent wiring.
export const BridgeChannels = {
  GameEvent: 'game:event',
  GameCommand: 'game:command',
} as const;

// Lazily create signals to avoid Phaser access during Node test import.
let eventSignal: Phaser.Signal | null = null;
let commandSignal: Phaser.Signal | null = null;

export const getEventSignal = () => {
  if (!eventSignal) {
    eventSignal = new Phaser.Signal();
  }
  return eventSignal;
};

export const getCommandSignal = () => {
  if (!commandSignal) {
    commandSignal = new Phaser.Signal();
  }
  return commandSignal;
};
