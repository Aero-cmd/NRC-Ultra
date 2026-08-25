export type NRCUltraPlatform = 'intel-macos' | 'apple-silicon' | 'other';

export type NRCUltraPerformanceProfile = {
  id: string;
  name: string;
  platform: NRCUltraPlatform;
  description: string;
  renderDistance: number;
  simulationDistance: number;
  particles: 'minimal' | 'decreased' | 'all';
  entityDistance: number;
  backgroundFps: number;
  enableDynamicFps: boolean;
  enableEntityCulling: boolean;
};

export const NRC_ULTRA_PERFORMANCE_PROFILES: readonly NRCUltraPerformanceProfile[] = [
  {
    id: 'intel-macos-donutsmp',
    name: 'Intel Mac — DonutSMP',
    platform: 'intel-macos',
    description: 'Conservative baseline for Intel Macs on a busy multiplayer server.',
    renderDistance: 8,
    simulationDistance: 5,
    particles: 'decreased',
    entityDistance: 75,
    backgroundFps: 20,
    enableDynamicFps: true,
    enableEntityCulling: true,
  },
  {
    id: 'maximum-fps',
    name: 'Maximum FPS',
    platform: 'other',
    description: 'Performance-first baseline; tune against real hardware.',
    renderDistance: 10,
    simulationDistance: 5,
    particles: 'minimal',
    entityDistance: 75,
    backgroundFps: 15,
    enableDynamicFps: true,
    enableEntityCulling: true,
  },
  {
    id: 'balanced',
    name: 'Balanced',
    platform: 'other',
    description: 'Balanced visual quality and performance.',
    renderDistance: 12,
    simulationDistance: 6,
    particles: 'decreased',
    entityDistance: 100,
    backgroundFps: 30,
    enableDynamicFps: true,
    enableEntityCulling: true,
  },
] as const;

export function getRecommendedPerformanceProfile(platform: NRCUltraPlatform, donutSmp = false) {
  if (platform === 'intel-macos' && donutSmp) return NRC_ULTRA_PERFORMANCE_PROFILES[0];
  return platform === 'other'
    ? NRC_ULTRA_PERFORMANCE_PROFILES[1]
    : NRC_ULTRA_PERFORMANCE_PROFILES[2];
}
