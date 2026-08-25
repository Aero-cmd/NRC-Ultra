import type { NrcModuleState } from './nrcUltraModuleState';

export type NrcUltraModuleAction =
  | { type: 'set-enabled'; moduleId: string; enabled: boolean }
  | { type: 'apply-server-profile'; address: string }
  | { type: 'reset' };

/** Pure action reducer for deterministic testing and future Tauri/Minecraft bridges. */
export function reduceNrcUltraModuleState(
  state: NrcModuleState,
  action: NrcUltraModuleAction,
  setEnabled: (state: NrcModuleState, moduleId: string, enabled: boolean) => NrcModuleState,
  detectProfile: (address: string) => NrcModuleState,
  defaults: NrcModuleState,
): NrcModuleState {
  switch (action.type) {
    case 'set-enabled':
      return setEnabled(state, action.moduleId, action.enabled);
    case 'apply-server-profile':
      return detectProfile(action.address);
    case 'reset':
      return { ...defaults };
  }
}
