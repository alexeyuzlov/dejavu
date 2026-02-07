export const formatBuildTime = (buildTime?: string): string => {
  if (!buildTime) {
    return 'unknown';
  }

  return Number.isNaN(Date.parse(buildTime)) ? buildTime : new Date(buildTime).toLocaleString();
};

export const buildInfoMessage = (buildSha?: string, buildTime?: string): string | null => {
  if (!buildSha && !buildTime) {
    return null;
  }

  return `Build: ${buildSha ?? 'unknown'} ${formatBuildTime(buildTime)}`;
};
