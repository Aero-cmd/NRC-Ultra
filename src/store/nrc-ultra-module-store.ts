import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NRC_ULTRA_DEFAULT_MODULE_STATE, setModuleEnabled, type NrcModuleState } from '../config/nrcUltraModuleState';
import { detectServerProfile } from '../config/nrcUltraServerProfiles';

export type NrcUltraModuleStore = {
  moduleState: NrcModuleState;
  activeServerProfile: string;
  setModuleEnabled: (moduleId: string, enabled: boolean) => void;
  detectServer: (address: string) => void;
  reset: () => void;
};

export const useNrcUltraModuleStore = create<NrcUltraModuleStore>()(
  persist(
    (set) => ({
      moduleState: { ...NRC_ULTRA_DEFAULT_MODULE_STATE },
      activeServerProfile: 'default',
      setModuleEnabled: (moduleId, enabled) =>
        set((state) => ({ moduleState: setModuleEnabled(state.moduleState, moduleId, enabled) })),
      detectServer: (address) => {
        const profile = detectServerProfile(address);
        set({ activeServerProfile: profile.id, moduleState: { ...profile.moduleState } });
      },
      reset: () => set({ moduleState: { ...NRC_ULTRA_DEFAULT_MODULE_STATE }, activeServerProfile: 'default' }),
    }),
    { name: 'nrc-ultra-module-store' },
  ),
);
