import { buildInfoMessage, formatBuildTime } from './build-info';

describe('build info', () => {
  it('formats build time using locale when valid', () => {
    const buildTime = '2024-01-02T03:04:05.000Z';

    expect(formatBuildTime(buildTime)).toBe(new Date(buildTime).toLocaleString());
  });

  it('falls back to original value when invalid', () => {
    expect(formatBuildTime('not-a-date')).toBe('not-a-date');
  });

  it('uses unknown when build time is missing', () => {
    expect(formatBuildTime(undefined)).toBe('unknown');
  });

  it('returns null when no build data provided', () => {
    expect(buildInfoMessage(undefined, undefined)).toBeNull();
  });

  it('builds a message with missing values', () => {
    expect(buildInfoMessage('abc123', undefined)).toBe('Build: abc123 unknown');
  });
});
