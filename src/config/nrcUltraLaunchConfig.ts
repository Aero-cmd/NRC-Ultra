import type { Profile } from '../types/profile';
import { profileToNrcInstance } from './nrcUltraInstanceAdapter';
import { getNrcUltraPreset } from './nrcUltraProfilePreset';
import { getNrcUltraPerformanceBudget } from './nrcUltraPerformanceBudget';

export interface NrcUltraLaunchConfig {
  instance: ReturnType<typeof profileToNrcInstance>;
  preset: ReturnType<typeof getNrcUltraPreset>;
  performanceBudget: ReturnType<typeof getNrcUltraPerformanceBudget>;
}

/** Builds the NRC Ultra launch configuration from the same profile the launcher is about to launch. */
export function buildNrcUltraLaunchConfig(profile: Profile): NrcUltraLaunchConfig {
  const preset = getNrcUltraPreset(profile);
  return {
    instance: profileToNrcInstance(profile),
    preset,
    performanceBudget: getNrcUltraPerformanceBudget(preset.performanceProfile),
  };
}
