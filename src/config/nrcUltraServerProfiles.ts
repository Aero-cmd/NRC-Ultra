import { DONUTSMP_DEFAULT_MODULES } from './nrcUltra';
import { applyProfile, NRC_ULTRA_DEFAULT_MODULE_STATE, type NrcModuleState } from './nrcUltraModuleState';

export type NrcServerProfile = {
  id: string;
  name: string;
  match: readonly string[];
  moduleState: NrcModuleState;
};

export const NRC_ULTRA_SERVER_PROFILES: readonly NrcServerProfile[] = [
  {
    id: 'default',
    name: 'Default',
    match: [],
    moduleState: NRC_ULTRA_DEFAULT_MODULE_STATE,
  },
  {
    id: 'donutsmp',
    name: 'DonutSMP',
    match: ['donutsmp'],
    moduleState: applyProfile(NRC_ULTRA_DEFAULT_MODULE_STATE, DONUTSMP_DEFAULT_MODULES),
  },
];

export function detectServerProfile(address: string): NrcServerProfile {
  const normalized = address.trim().toLowerCase();
  return NRC_ULTRA_SERVER_PROFILES.find((profile) =>
    profile.match.length > 0 && profile.match.some((keyword) => normalized.includes(keyword)),
  ) ?? NRC_ULTRA_SERVER_PROFILES[0];
}
