export type NrcMinecraftLoader = 'vanilla' | 'fabric' | 'forge' | 'neoforge' | 'quilt';
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

export const NRC_MINECRAFT_LOADERS: readonly NrcMinecraftLoader[] = ['vanilla', 'fabric', 'forge', 'neoforge', 'quilt'];

export const DEFAULT_NRC_INSTANCE: Omit<NrcInstance, 'id' | 'name' | 'minecraftVersion'> = {
  loader: 'fabric', minMemoryMb: 1024, maxMemoryMb: 4096, contents: [], moduleState: {},
  performanceProfileId: 'balanced', serverProfileId: 'default',
};

export function isClientLoader(loader: NrcMinecraftLoader) {
  return NRC_MINECRAFT_LOADERS.includes(loader);
}

export function isContentCompatible(kind: NrcContentKind, loader: NrcMinecraftLoader) {
  if (kind !== 'mod') return true;
  return loader !== 'vanilla';
}

export function validateNrcInstance(instance: NrcInstance): string[] {
  const errors: string[] = [];
  if (!instance.id.trim()) errors.push('Instance ID is required.');
  if (!instance.name.trim()) errors.push('Instance name is required.');
  if (!instance.minecraftVersion.trim()) errors.push('Minecraft version is required.');
  if (!isClientLoader(instance.loader)) errors.push('Unsupported client loader.');
  if (!Number.isInteger(instance.minMemoryMb) || instance.minMemoryMb < 512) errors.push('Minimum memory must be at least 512 MB.');
  if (!Number.isInteger(instance.maxMemoryMb) || instance.maxMemoryMb < instance.minMemoryMb) errors.push('Maximum memory must be at least minimum memory.');
  return errors;
}
