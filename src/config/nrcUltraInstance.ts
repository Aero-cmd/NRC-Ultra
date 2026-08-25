export type NrcMinecraftLoader = 'fabric' | 'forge' | 'neoforge' | 'quilt';
export type NrcContentKind = 'mod' | 'resource-pack' | 'shader' | 'data-pack';

export type NrcInstanceContent = {
  id: string;
  name: string;
  kind: NrcContentKind;
  source: 'modrinth' | 'curseforge' | 'local';
  enabled: boolean;
  versionId?: string;
};

export type NrcInstance = {
  id: string;
  name: string;
  minecraftVersion: string;
  loader: NrcMinecraftLoader;
  loaderVersion?: string;
  javaPath?: string;
  minMemoryMb: number;
  maxMemoryMb: number;
  contents: NrcInstanceContent[];
  moduleState: Record<string, boolean>;
  performanceProfileId: string;
  serverProfileId: string;
};

export const DEFAULT_NRC_INSTANCE: Omit<NrcInstance, 'id' | 'name' | 'minecraftVersion'> = {
  loader: 'fabric',
  minMemoryMb: 1024,
  maxMemoryMb: 4096,
  contents: [],
  moduleState: {},
  performanceProfileId: 'balanced',
  serverProfileId: 'default',
};

export function isClientLoader(loader: NrcMinecraftLoader) {
  return loader === 'fabric' || loader === 'forge' || loader === 'neoforge' || loader === 'quilt';
}

export function isContentCompatible(kind: NrcContentKind, loader: NrcMinecraftLoader) {
  if (kind !== 'mod') return true;
  return isClientLoader(loader);
}
