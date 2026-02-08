import { RainEffect } from '../../../prefab/rain-effect';
import { AbstractZone } from '../abstract-zone';

export class Zone1 extends AbstractZone {
  rainEffect!: RainEffect;

  preload() {
    super.preload();

    this.load.image(this.bgKey, 'assets/images/zone1.png');
    RainEffect.preload(this);
  }

  create() {
    super.create();

    this.cameras.main.setBackgroundColor('#D7F5FF');
    this.rainEffect = new RainEffect(this, this.cameras.main);
  }

  update(time: number, delta: number) {
    super.update(time, delta);

    this.scrollSky();
    this.rainEffect.update(this.cameras.main);
  }

  scrollSky() {
    this.bg.tilePositionX -= 2;
  }
}
