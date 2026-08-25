/** Feature gates for the launcher-side NRC Ultra experience. */
export const NRC_ULTRA_FEATURE_FLAGS = {
  moduleManager: true,
  performanceProfiles: true,
  serverProfiles: true,
  donutSmpProfile: true,
  experimentalIntelOptimisations: false,
} as const;

export type NrcUltraFeatureFlag = keyof typeof NRC_ULTRA_FEATURE_FLAGS;

export function isNrcUltraFeatureEnabled(flag: NrcUltraFeatureFlag) {
  return NRC_ULTRA_FEATURE_FLAGS[flag];
}
