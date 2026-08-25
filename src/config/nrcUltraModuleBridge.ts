import type { NrcUltraLaunchConfig } from './nrcUltraLaunchConfig';
import { NRC_ULTRA_MODULE_MANIFEST } from './nrcUltraModuleManifest';

export interface NrcUltraClientConfig {
  schemaVersion: 1;
  instanceId: string;
  minecraftVersion: string;
  loader: string;
  serverProfile: string;
  performanceProfile: string;
  enabledModules: Record<string, boolean>;
}

/** Serializes launcher decisions into a stable, versioned client-side config contract. */
export function buildNrcUltraClientConfig(config: NrcUltraLaunchConfig): NrcUltraClientConfig {
  const enabledModules: Record<string, boolean> = {};
  for (const module of NRC_ULTRA_MODULE_MANIFEST) {
    enabledModules[module.id] = config.preset.modules[module.id]?.enabled ?? module.defaultEnabled;
  }

  return {
    schemaVersion: 1,
    instanceId: config.instance.id,
    minecraftVersion: config.instance.minecraftVersion,
    loader: config.instance.loader,
    serverProfile: config.preset.serverProfile,
    performanceProfile: config.preset.performanceProfile,
    enabledModules,
  };
}
