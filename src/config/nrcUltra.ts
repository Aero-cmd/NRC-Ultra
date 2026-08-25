export type NrcPerformanceProfile = {
  id: string;
  name: string;
  description: string;
  target: 'intel-macos' | 'apple-silicon' | 'generic';
  renderDistance: number;
  simulationDistance: number;
  maxFps: number;
  particles: 'minimal' | 'decreased' | 'all';
  entityDistance: number;
  backgroundFps: number;
};

export const NRC_ULTRA_VERSION = '0.1.0';

export const NRC_ULTRA_PROFILES: NrcPerformanceProfile[] = [
  {
    id: 'intel-macos-donutsmp', name: 'Intel Mac — DonutSMP',
    description: 'Low-overhead settings tuned as a conservative Intel Mac multiplayer baseline.',
    target: 'intel-macos', renderDistance: 8, simulationDistance: 5, maxFps: 240,
    particles: 'decreased', entityDistance: 75, backgroundFps: 20,
  },
  {
    id: 'intel-macos', name: 'Intel Mac',
    description: 'Balanced Intel Mac profile with conservative background work.',
    target: 'intel-macos', renderDistance: 10, simulationDistance: 6, maxFps: 180,
    particles: 'decreased', entityDistance: 64, backgroundFps: 20,
  },
  {
    id: 'maximum-fps', name: 'Maximum FPS',
    description: 'Prioritise frame rate and frametime consistency.',
    target: 'generic', renderDistance: 8, simulationDistance: 5, maxFps: 0,
    particles: 'minimal', entityDistance: 64, backgroundFps: 15,
  },
  {
    id: 'balanced', name: 'Balanced',
    description: 'A sensible performance and visual-quality baseline.',
    target: 'generic', renderDistance: 12, simulationDistance: 6, maxFps: 240,
    particles: 'decreased', entityDistance: 100, backgroundFps: 30,
  },
];

export type NrcModuleCategory = 'hud' | 'performance' | 'chat' | 'inventory' | 'world' | 'qol' | 'cosmetics';
export type NrcModuleDefinition = {
  id: string; name: string; category: NrcModuleCategory; description: string;
  performanceCost: 'none' | 'low' | 'medium'; serverAware?: boolean;
};

export const NRC_ULTRA_MODULES: NrcModuleDefinition[] = [
  { id: 'fps', name: 'FPS', category: 'hud', description: 'Display current FPS and frame-time information.', performanceCost: 'none' },
  { id: 'ping', name: 'Ping', category: 'hud', description: 'Display server latency.', performanceCost: 'none' },
  { id: 'coordinates', name: 'Coordinates', category: 'hud', description: 'Display player coordinates.', performanceCost: 'none' },
  { id: 'direction', name: 'Direction', category: 'hud', description: 'Display facing direction.', performanceCost: 'none' },
  { id: 'armour', name: 'Armour HUD', category: 'hud', description: 'Display equipped armour and durability.', performanceCost: 'low' },
  { id: 'session-stats', name: 'Session Stats', category: 'hud', description: 'Track session time and client-side statistics.', performanceCost: 'low' },
  { id: 'dynamic-fps', name: 'Dynamic FPS', category: 'performance', description: 'Reduce background rendering work when Minecraft is unfocused.', performanceCost: 'none' },
  { id: 'entity-culling', name: 'Entity Culling', category: 'performance', description: 'Avoid rendering entities that cannot contribute to the frame.', performanceCost: 'low' },
  { id: 'particle-control', name: 'Particle Control', category: 'performance', description: 'Control particle density to reduce render workload.', performanceCost: 'none' },
  { id: 'chat-timestamps', name: 'Chat Timestamps', category: 'chat', description: 'Add compact timestamps to chat messages.', performanceCost: 'none' },
  { id: 'chat-filter', name: 'Chat Filter', category: 'chat', description: 'Client-side message filtering and highlighting.', performanceCost: 'low' },
  { id: 'shulker-preview', name: 'Shulker Preview', category: 'inventory', description: 'Preview container contents without opening it.', performanceCost: 'low' },
  { id: 'zoom', name: 'Zoom', category: 'world', description: 'Temporary client-side camera zoom.', performanceCost: 'none' },
  { id: 'waypoints', name: 'Waypoints', category: 'world', description: 'Manage client-side world waypoints.', performanceCost: 'low' },
  { id: 'fullbright', name: 'Fullbright', category: 'qol', description: 'Improve visibility in dark areas without server interaction.', performanceCost: 'none' },
  { id: 'donutsmp-profile', name: 'DonutSMP Profile', category: 'qol', description: 'Server-aware QoL defaults for DonutSMP.', performanceCost: 'none', serverAware: true },
];

export const DONUTSMP_DEFAULT_MODULES = [
  'fps', 'ping', 'coordinates', 'direction', 'armour', 'session-stats',
  'dynamic-fps', 'entity-culling', 'particle-control', 'chat-timestamps',
  'chat-filter', 'shulker-preview', 'zoom', 'waypoints', 'fullbright', 'donutsmp-profile',
] as const;
