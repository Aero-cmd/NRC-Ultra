import { NRC_ULTRA_MODULES, type NrcModuleDefinition } from './nrcUltra';

export type NrcModuleState = Record<string, boolean>;

export const NRC_ULTRA_DEFAULT_MODULE_STATE: NrcModuleState = Object.fromEntries(
  NRC_ULTRA_MODULES.map((module) => [module.id, module.id !== 'chat-filter']),
);

export function getEnabledModules(state: NrcModuleState): NrcModuleDefinition[] {
  return NRC_ULTRA_MODULES.filter((module) => state[module.id] === true);
}

export function setModuleEnabled(state: NrcModuleState, moduleId: string, enabled: boolean): NrcModuleState {
  if (!NRC_ULTRA_MODULES.some((module) => module.id === moduleId)) return state;
  return { ...state, [moduleId]: enabled };
}

export function applyProfile(state: NrcModuleState, enabledIds: readonly string[]): NrcModuleState {
  const enabled = new Set(enabledIds);
  return Object.fromEntries(NRC_ULTRA_MODULES.map((module) => [module.id, enabled.has(module.id)]));
}
