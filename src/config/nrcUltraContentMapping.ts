import { ContentType } from '../types/content';
import { ModPlatform, UnifiedProjectType } from '../types/unified';
import type { NrcContentKind } from './nrcUltraInstance';

export function projectTypeToNrcContentKind(type: UnifiedProjectType): NrcContentKind | null {
  switch (type) {
    case UnifiedProjectType.Mod:
      return 'mod';
    case UnifiedProjectType.ResourcePack:
      return 'resource-pack';
    case UnifiedProjectType.Shader:
      return 'shader';
    case UnifiedProjectType.Datapack:
      return 'data-pack';
    default:
      return null;
  }
}

export function projectTypeToContentType(type: UnifiedProjectType): ContentType | null {
  switch (type) {
    case UnifiedProjectType.Mod:
      return ContentType.Mod;
    case UnifiedProjectType.ResourcePack:
      return ContentType.ResourcePack;
    case UnifiedProjectType.Shader:
      return ContentType.ShaderPack;
    case UnifiedProjectType.Datapack:
      return ContentType.DataPack;
    default:
      return null;
  }
}

export function modPlatformToNrcSource(source: ModPlatform): 'modrinth' | 'curseforge' {
  return source === ModPlatform.Modrinth ? 'modrinth' : 'curseforge';
}
