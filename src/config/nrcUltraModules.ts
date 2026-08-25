export type NRCUltraModuleCategory = 'hud' | 'performance' | 'chat' | 'inventory' | 'world' | 'qol' | 'cosmetics';
export type NRCUltraPerformanceCost = 'negligible' | 'low' | 'medium' | 'high';

export type NRCUltraModuleDefinition = {
  id: string;
  name: string;
  description: string;
  category: NRCUltraModuleCategory;
  defaultEnabled: boolean;
  performanceCost: NRCUltraPerformanceCost;
  donuSmpRecommended?: boolean;
};

/** Declarative catalogue used by launcher UI, profiles, and future benchmarking. */
export const NRC_ULTRA_MODULES: readonly NRCUltraModuleDefinition[] = [
  { id: 'fps', name: 'FPS', description: 'Display current frames per second.', category: 'hud', defaultEnabled: true, performanceCost: 'negligible' },
  { id: 'ping', name: 'Ping', description: 'Display server latency.', category: 'hud', defaultEnabled: true, performanceCost: 'negligible' },
  { id: 'coordinates', name: 'Coordinates', description: 'Display player coordinates.', category: 'hud', defaultEnabled: true, performanceCost: 'negligible' },
  { id: 'direction', name: 'Direction', description: 'Display facing direction.', category: 'hud', defaultEnabled: true, performanceCost: 'negligible' },
  { id: 'armor', name: 'Armor HUD', description: 'Display equipped armor and durability.', category: 'hud', defaultEnabled: true, performanceCost: 'low' },
  { id: 'potion-effects', name: 'Potion Effects', description: 'Display active effects and duration.', category: 'hud', defaultEnabled: true, performanceCost: 'low' },
  { id: 'session-stats', name: 'Session Stats', description: 'Track basic session statistics.', category: 'hud', defaultEnabled: true, performanceCost: 'low' },
  { id: 'dynamic-fps', name: 'Dynamic FPS', description: 'Reduce rendering work while unfocused or idle.', category: 'performance', defaultEnabled: true, performanceCost: 'negligible' },
  { id: 'particle-limiter', name: 'Particle Limiter', description: 'Reduce excessive particle rendering.', category: 'performance', defaultEnabled: true, performanceCost: 'low' },
  { id: 'entity-culling', name: 'Entity Culling', description: 'Avoid rendering entities that cannot be seen.', category: 'performance', defaultEnabled: true, performanceCost: 'low' },
  { id: 'chat-timestamps', name: 'Chat Timestamps', description: 'Add compact timestamps to chat messages.', category: 'chat', defaultEnabled: true, performanceCost: 'negligible' },
  { id: 'chat-filter', name: 'Chat Filters', description: 'Filter configurable chat patterns locally.', category: 'chat', defaultEnabled: false, performanceCost: 'low' },
  { id: 'shulker-preview', name: 'Shulker Preview', description: 'Preview supported container contents.', category: 'inventory', defaultEnabled: true, performanceCost: 'low' },
  { id: 'inventory-search', name: 'Inventory Search', description: 'Search visible inventory contents.', category: 'inventory', defaultEnabled: false, performanceCost: 'low' },
  { id: 'waypoints', name: 'Waypoints', description: 'Manage client-side world waypoints.', category: 'world', defaultEnabled: true, performanceCost: 'low' },
  { id: 'zoom', name: 'Zoom', description: 'Client-side camera zoom.', category: 'qol', defaultEnabled: true, performanceCost: 'negligible' },
  { id: 'fullbright', name: 'Fullbright', description: 'Client-side brightness enhancement.', category: 'qol', defaultEnabled: false, performanceCost: 'negligible' },
  { id: 'donut-session', name: 'DonutSMP Session', description: 'DonutSMP-oriented session HUD and utility state.', category: 'qol', defaultEnabled: true, performanceCost: 'low', donuSmpRecommended: true },
  { id: 'custom-crosshair', name: 'Custom Crosshair', description: 'Configure a lightweight client-side crosshair.', category: 'cosmetics', defaultEnabled: false, performanceCost: 'negligible' },
] as const;

export function getModulesForCategory(category: NRCUltraModuleCategory) {
  return NRC_ULTRA_MODULES.filter((module) => module.category === category);
}
