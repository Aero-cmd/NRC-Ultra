export type NrcUltraPerformanceProfile = 'battery' | 'balanced' | 'max-performance';

export interface NrcUltraPerformanceBudget {
  maxExpensiveModules: number;
  enableAnimationEffects: boolean;
  enableBackgroundRefresh: boolean;
  targetHudUpdatesPerSecond: number;
}

/** Conservative client-side budgets for the launcher to pass to the eventual Minecraft runtime. */
export const NRC_ULTRA_PERFORMANCE_BUDGETS: Record<NrcUltraPerformanceProfile, NrcUltraPerformanceBudget> = {
  battery: {
    maxExpensiveModules: 0,
    enableAnimationEffects: false,
    enableBackgroundRefresh: false,
    targetHudUpdatesPerSecond: 10,
  },
  balanced: {
    maxExpensiveModules: 1,
    enableAnimationEffects: true,
    enableBackgroundRefresh: true,
    targetHudUpdatesPerSecond: 20,
  },
  'max-performance': {
    maxExpensiveModules: 2,
    enableAnimationEffects: true,
    enableBackgroundRefresh: true,
    targetHudUpdatesPerSecond: 30,
  },
};

export function getNrcUltraPerformanceBudget(profile: NrcUltraPerformanceProfile) {
  return NRC_ULTRA_PERFORMANCE_BUDGETS[profile];
}
