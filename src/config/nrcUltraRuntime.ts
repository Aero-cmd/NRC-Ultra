import { NRC_ULTRA_MODULES, type NrcModuleDefinition } from './nrcUltra';
import type { NrcModuleState } from './nrcUltraModuleState';

/** Runtime-safe helpers shared by launcher UI and future Minecraft integration. */
export function getActiveModuleDefinitions(state: NrcModuleState): NrcModuleDefinition[] {
  return NRC_ULTRA_MODULES.filter((module) => state[module.id] === true);
}

export function getModulePerformanceSummary(state: NrcModuleState) {
  const active = getActiveModuleDefinitions(state);
  return {
    total: active.length,
    negligible: active.filter((m) => m.performanceCost === 'none').length,
    low: active.filter((m) => m.performanceCost === 'low').length,
    medium: active.filter((m) => m.performanceCost === 'medium').length,
  };
}
