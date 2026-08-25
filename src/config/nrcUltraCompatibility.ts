import type { NrcMinecraftLoader, NrcContentKind } from './nrcUltraInstance';

export type NrcCompatibility = { compatible: boolean; reasons: string[] };

export function checkContentCompatibility(
  content: { kind: NrcContentKind; supportedLoaders?: readonly NrcMinecraftLoader[]; supportedMinecraftVersions?: readonly string[] },
  instance: { loader: NrcMinecraftLoader; minecraftVersion: string },
): NrcCompatibility {
  const reasons: string[] = [];
  if (content.supportedLoaders && !content.supportedLoaders.includes(instance.loader)) {
    reasons.push(`Not available for ${instance.loader}.`);
  }
  if (content.supportedMinecraftVersions && !content.supportedMinecraftVersions.includes(instance.minecraftVersion)) {
    reasons.push(`Not marked compatible with Minecraft ${instance.minecraftVersion}.`);
  }
  return { compatible: reasons.length === 0, reasons };
}

export function validateMemory(minMemoryMb: number, maxMemoryMb: number): NrcCompatibility {
  const reasons: string[] = [];
  if (!Number.isInteger(minMemoryMb) || minMemoryMb < 512) reasons.push('Minimum memory must be at least 512 MB.');
  if (!Number.isInteger(maxMemoryMb) || maxMemoryMb < minMemoryMb) reasons.push('Maximum memory must be at least the minimum memory.');
  return { compatible: reasons.length === 0, reasons };
}
