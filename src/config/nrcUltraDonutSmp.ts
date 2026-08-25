export const NRC_ULTRA_DONUTSMP_PROFILE = {
  id: 'donutsmp',
  displayName: 'DonutSMP',
  serverKeywords: ['donutsmp'],
  description: 'Client-side QoL defaults for DonutSMP.',
  enabledModules: [
    'fps', 'ping', 'coordinates', 'direction', 'armor', 'potion-effects',
    'session-stats', 'dynamic-fps', 'entity-culling', 'chat-timestamps',
    'shulker-preview', 'waypoints', 'zoom', 'donut-session',
  ],
} as const;

export function matchesDonutSmpServer(serverAddress: string) {
  const normalized = serverAddress.trim().toLowerCase();
  return NRC_ULTRA_DONUTSMP_PROFILE.serverKeywords.some((keyword) => normalized.includes(keyword));
}
