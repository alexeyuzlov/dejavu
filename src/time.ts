import { now, seconds } from './state/phaser-helpers';

export const timeNow = (game: Phaser.Game) => now(game);

export const secondsToMs = (value: number) => seconds(value);
