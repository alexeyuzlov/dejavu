import { now, seconds } from './state/phaser-helpers';

export const timeNow = (scene: Phaser.Scene) => now(scene);

export const secondsToMs = (value: number) => seconds(value);
