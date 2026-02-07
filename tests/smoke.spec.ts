import { expect, test } from '@playwright/test';
import { BridgeChannels } from '../src/bridge/bridge-shared';
import { GameCommandType } from '../src/bridge/game-commands';
import { GameEventType } from '../src/bridge/game-events';
import { Levels, Stories } from '../src/global-config';

declare global {
  interface Window {
    // Playwright hook for test-only event capture.
    pushEvent: (payload: unknown) => void;
  }
}

test('canvas renders and scene flow works', async ({ page }) => {
  const errors: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });

  page.on('pageerror', (error) => {
    errors.push(error.message);
  });

  const events: Array<{ type: string; payload?: { name?: string; length?: number } }> = [];
  await page.exposeFunction(
    'pushEvent',
    (event: { type: string; payload?: { name?: string; length?: number } }) => {
      events.push(event);
    },
  );
  await page.addInitScript((channel) => {
    window.addEventListener(channel, (event) => {
      window.pushEvent((event as CustomEvent).detail);
    });
  }, BridgeChannels.GameEvent);

  await page.goto('/', { waitUntil: 'load' });
  await expect(page.locator('canvas')).toBeVisible();

  const story1 = Stories[Stories.Story1];
  const story2 = Stories[Stories.Story2];
  const story3 = Stories[Stories.Story3];
  const story4 = Stories[Stories.Story4];
  const zone1 = Levels[Levels.Zone1Level1];
  const zone2 = Levels[Levels.Zone2Level1];
  const zone3 = Levels[Levels.Zone3Level1];
  const zone4 = Levels[Levels.Zone4Level1];
  const gameOver = 'gameOver';

  const waitForEvent = async (type: string, name?: string) => {
    await expect
      .poll(() =>
        events.some((event) => event.type === type && (name ? event.payload?.name === name : true)),
      )
      .toBe(true);
  };

  const waitForStoryText = async (name: string, minLength: number) => {
    await expect
      .poll(() =>
        events.some(
          (event) =>
            event.type === GameEventType.StoryTextProgress &&
            event.payload?.name === name &&
            (event.payload?.length ?? 0) >= minLength,
        ),
      )
      .toBe(true);
  };

  const dispatchState = async (name: string) => {
    await page.evaluate(
      ({ channel, type, payload }) => {
        window.dispatchEvent(new CustomEvent(channel, { detail: { type, payload } }));
      },
      { channel: BridgeChannels.GameCommand, type: GameCommandType.StateStart, payload: { name } },
    );
  };

  await waitForEvent(GameEventType.StoryStarted, story1);
  await waitForStoryText(story1, 10);

  await dispatchState(zone1);
  await waitForEvent(GameEventType.LevelStarted, zone1);
  await waitForEvent(GameEventType.PlayerReady, zone1);

  await dispatchState(story2);
  await waitForEvent(GameEventType.StoryStarted, story2);
  await waitForStoryText(story2, 10);

  await dispatchState(zone2);
  await waitForEvent(GameEventType.LevelStarted, zone2);
  await waitForEvent(GameEventType.PlayerReady, zone2);

  await dispatchState(story3);
  await waitForEvent(GameEventType.StoryStarted, story3);
  await waitForStoryText(story3, 10);

  await dispatchState(zone3);
  await waitForEvent(GameEventType.LevelStarted, zone3);
  await waitForEvent(GameEventType.PlayerReady, zone3);

  await dispatchState(story4);
  await waitForEvent(GameEventType.StoryStarted, story4);
  await waitForStoryText(story4, 10);

  await dispatchState(zone4);
  await waitForEvent(GameEventType.LevelStarted, zone4);
  await waitForEvent(GameEventType.PlayerReady, zone4);

  await dispatchState(gameOver);
  await waitForEvent(GameEventType.GameOver);

  expect(errors).toEqual([]);
});
