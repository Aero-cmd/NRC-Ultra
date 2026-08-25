export type NrcUltraModuleCapability = 'hud' | 'performance' | 'world' | 'chat' | 'inventory' | 'cosmetic' | 'qol';

export interface NrcUltraModuleCapabilitySpec {
  id: string;
  capability: NrcUltraModuleCapability;
  clientOnly: true;
  expensive: boolean;
}

/** Capability metadata kept separate from UI so the future Minecraft bridge can validate modules without React. */
export const NRC_ULTRA_MODULE_CAPABILITIES: readonly NrcUltraModuleCapabilitySpec[] = [
  { id: 'fps-hud', capability: 'hud', clientOnly: true, expensive: false },
  { id: 'coordinates', capability: 'hud', clientOnly: true, expensive: false },
  { id: 'dynamic-fps', capability: 'performance', clientOnly: true, expensive: false },
  { id: 'zoom', capability: 'qol', clientOnly: true, expensive: false },
  { id: 'waypoints', capability: 'world', clientOnly: true, expensive: false },
  { id: 'chat-timestamps', capability: 'chat', clientOnly: true, expensive: false },
  { id: 'shulker-preview', capability: 'inventory', clientOnly: true, expensive: true },
];
