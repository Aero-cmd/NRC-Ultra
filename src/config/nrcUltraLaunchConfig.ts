import type { Profile } from '../types/profile';
import { profileToNrcInstance } from './nrcUltraInstanceAdapter';
import { getNrcUltraPreset } from './nrcUltraProfilePreset';

export interface NrcUltraLaunchConfig {
  instance: ReturnType<typeof profileToNrcInstance>;
  preset: ReturnType<typeof getNrcUltraPreset>;
}

/** Builds the NRC Ultra launch configuration from the same profile the launcher is about to launch. */
export function buildNrcUltraLaunchConfig(profile: Profile): NrcUltraLaunchConfig {
  return {
    instance: profileToNrcInstance(profile),
    preset: getNrcUltraPreset(profile),
  };
}
