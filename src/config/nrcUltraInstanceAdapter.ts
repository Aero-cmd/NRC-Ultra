import type { NrcInstance } from './nrcUltraInstance';
import type { Profile } from '../types/profile';

/** Maps the existing launcher Profile into NRC Ultra's instance model. */
export function profileToNrcInstance(profile: Profile): NrcInstance {
  const settings = profile.settings;
  return {
    id: profile.id,
    name: profile.name,
    minecraftVersion: profile.minecraft_version,
    loader: profile.loader,
    loaderVersion: profile.loader_version?.version ?? null,
    javaPath: settings?.java_path ?? null,
    memory: {
      min: settings?.memory?.min ?? 2048,
      max: settings?.memory?.max ?? 4096,
    },
    mods: [],
    resourcePacks: [],
    shaders: [],
    dataPacks: [],
    modules: {},
    performanceProfile: 'balanced',
    serverProfile: 'default',
  };
}
