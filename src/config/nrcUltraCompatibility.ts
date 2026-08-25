import type { NrcMinecraftLoader, NrcContentKind, NrcInstance } from './nrcUltraInstance';
import { NRC_ULTRA_MODULE_MANIFEST, type NrcUltraModuleManifest } from './nrcUltraModuleManifest';

export type NrcCompatibility = { compatible: boolean; reasons: string[] };

export function checkContentCompatibility(
  content: { kind: NrcContentKind; supportedLoaders?: readonly NrcMinecraftLoader[]; supportedMinecraftVersions?: readonly string[] },
  instance: { loader: NrcMinecraftLoader; minecraftVersion: string },
): NrcCompatibility {
  const reasons: string[] = [];
  if (content.supportedLoaders && !content.supportedLoaders.includes(instance.loader)) reasons.push(`Not available for ${instance.loader}.`);
  if (content.supportedMinecraftVersions && !content.supportedMinecraftVersions.includes(instance.minecraftVersion)) reasons.push(`Not marked compatible with Minecraft ${instance.minecraftVersion}.`);
  return { compatible: reasons.length === 0, reasons };
}

export function validateMemory(minMemoryMb: number, maxMemoryMb: number): NrcCompatibility {
  const reasons: string[] = [];
  if (!Number.isInteger(minMemoryMb) || minMemoryMb < 512) reasons.push('Minimum memory must be at least 512 MB.');
  if (!Number.isInteger(maxMemoryMb) || maxMemoryMb < minMemoryMb) reasons.push('Maximum memory must be at least the minimum memory.');
  return { compatible: reasons.length === 0, reasons };
}

export function isMinecraftVersionSupported(patterns: readonly string[], version: string): boolean {
  return patterns.some((pattern) => pattern === '*' || pattern === version || (pattern.endsWith('x') && version.startsWith(pattern.slice(0, -1))));
}

export function getCompatibleNrcModules(instance: NrcInstance): NrcUltraModuleManifest[] {
  return NRC_ULTRA_MODULE_MANIFEST.filter((module) =>
    module.compatibleLoaders.includes(instance.loader) && isMinecraftVersionSupported(module.minecraftVersions, instance.minecraftVersion),
  );
}

export function getIncompatibleEnabledModules(instance: NrcInstance): string[] {
  const compatible = new Set(getCompatibleNrcModules(instance).map((module) => module.id));
  return Object.entries(instance.moduleState).filter(([id, enabled]) => enabled && !compatible.has(id)).map(([id]) => id);
}

export function validateNrcUltraCompatibility(instance: NrcInstance): string[] {
  return getIncompatibleEnabledModules(instance).map((id) => `Module "${id}" is not compatible with ${instance.minecraftVersion} + ${instance.loader}.`);
}
