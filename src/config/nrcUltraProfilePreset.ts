import type { Profile } from '../types/profile';
import type { NrcModuleState } from './nrcUltraModuleState';
import { detectServerProfile } from './nrcUltraServerProfiles';

export interface NrcUltraProfilePreset {
  modules: NrcModuleState;
  performanceProfile: 'battery' | 'balanced' | 'max-performance';
  serverProfile: string;
}

/** Derives an NRC Ultra preset from an existing launcher profile without mutating it. */
export function getNrcUltraPreset(profile: Profile, serverAddress = ''): NrcUltraProfilePreset {
  const server = detectServerProfile(serverAddress);
  const modules = server.moduleState;
  const performanceProfile = server.id === 'donutsmp' ? 'max-performance' : 'balanced';

  return {
    modules,
    performanceProfile,
    serverProfile: server.id,
  };
}
