import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NRC_ULTRA_DEFAULT_MODULE_STATE, setModuleEnabled, type NrcModuleState } from '../config/nrcUltraModuleState';
import { NRC_ULTRA_MODULES } from '../config/nrcUltra';
import { detectServerProfile } from '../config/nrcUltraServerProfiles';

export type NrcUltraStore = {
  modules: NrcModuleState;
  activeServerProfile: string;
  setModuleEnabled: (moduleId: string, enabled: boolean) => void;
  applyServerProfile: (address: string) => void;
  resetModules: () => void;
};

export const useNrcUltraStore = create<NrcUltraStore>()(persist((set) => ({
  modules: NRC_ULTRA_DEFAULT_MODULE_STATE,
  activeServerProfile: 'default',
  setModuleEnabled: (moduleId, enabled) => set((state) => ({
    modules: setModuleEnabled(state.modules, moduleId, enabled),
  })),
  applyServerProfile: (address) => {
    const profile = detectServerProfile(address);
    set({ activeServerProfile: profile.id, modules: profile.moduleState });
  },
  resetModules: () => set({ modules: Object.fromEntries(NRC_ULTRA_MODULES.map((module) => [module.id, false])) }),
})), { name: 'nrc-ultra-module-storage' }));
