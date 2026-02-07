import { TextureKey } from './texture-keys';

describe('TextureKey', () => {
  it('keeps unique texture values', () => {
    const values = Object.values(TextureKey);
    const uniqueValues = new Set(values);

    expect(uniqueValues.size).toBe(values.length);
  });

  it('has a stable player key', () => {
    expect(TextureKey.Player).toBe('player');
  });
});
