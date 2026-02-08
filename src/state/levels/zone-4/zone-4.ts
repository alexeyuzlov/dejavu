import { AbstractZone } from '../abstract-zone';

export class Zone4 extends AbstractZone {
  preload() {
    this.load.image(this.bgKey, 'assets/images/zone4.jpg');
    super.preload();
  }

  create() {
    super.create();
  }
}
