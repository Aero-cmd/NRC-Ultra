import { NRC_ULTRA_MODULES } from './nrcUltra';
import type { NrcModuleCategory, NrcModuleDefinition } from './nrcUltra';

export const NRC_ULTRA_MODULE_CATEGORIES: readonly NrcModuleCategory[] = [
  'hud', 'performance', 'chat', 'inventory', 'world', 'qol', 'cosmetics',
] as const;

export function getModulesByCategory(category: NrcModuleCategory): NrcModuleDefinition[] {
  return NRC_ULTRA_MODULES.filter((module) => module.category === category);
}

export function findNrcUltraModule(id: string): NrcModuleDefinition | undefined {
  return NRC_ULTRA_MODULES.find((module) => module.id === id);
}
