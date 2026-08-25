import type { NrcInstance, NrcInstanceContent } from './nrcUltraInstance';
import type { Profile } from '../types/profile';

function mapModContent(profile: Profile): NrcInstanceContent[] {
  return profile.mods.map((mod) => {
    const source = mod.source;
    const normalizedSource = source.type === 'modrinth'
      ? 'modrinth'
      : source.type === 'curseforge'
        ? 'curseforge'
        : 'local';

    const versionId = source.type === 'modrinth' || source.type === 'curseforge'
      ? source.version_id
      : undefined;

    return {
      id: mod.id,
      name: mod.display_name ?? mod.id,
      kind: 'mod',
      source: normalizedSource,
      enabled: mod.enabled,
      versionId,
    };
  });
}

/** Maps the existing launcher Profile into NRC Ultra's instance model. */
export function profileToNrcInstance(profile: Profile): NrcInstance {
  const settings = profile.settings;
  return {
    id: profile.id,
    name: profile.name,
    minecraftVersion: profile.game_version,
    loader: profile.loader === 'vanilla' ? 'fabric' : profile.loader,
    loaderVersion: profile.loader_version ?? undefined,
    javaPath: settings.java_path ?? undefined,
    minMemoryMb: settings.memory.min,
    maxMemoryMb: settings.memory.max,
    contents: mapModContent(profile),
    moduleState: {},
    performanceProfileId: 'balanced',
    serverProfileId: 'default',
  };
}
