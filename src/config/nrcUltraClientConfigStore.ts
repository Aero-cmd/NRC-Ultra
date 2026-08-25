import type { NrcUltraClientConfig } from './nrcUltraModuleBridge';

/**
 * Serializes the launcher/client contract deterministically so the native launcher
 * layer can persist it beside a Minecraft instance.
 */
export function serializeNrcUltraClientConfig(config: NrcUltraClientConfig): string {
  return `${JSON.stringify(config, null, 2)}\n`;
}

/** Basic validation before a generated config is handed to the native instance layer. */
export function validateNrcUltraClientConfig(config: NrcUltraClientConfig): string[] {
  const errors: string[] = [];
  if (config.schemaVersion !== 1) errors.push('Unsupported NRC Ultra client config schema.');
  if (!config.instanceId.trim()) errors.push('Instance ID is required.');
  if (!config.minecraftVersion.trim()) errors.push('Minecraft version is required.');
  if (!config.loader.trim()) errors.push('Minecraft loader is required.');
  if (!config.serverProfile.trim()) errors.push('Server profile is required.');
  if (!config.performanceProfile.trim()) errors.push('Performance profile is required.');
  return errors;
}
