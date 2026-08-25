export type NrcModulePlatform = 'client';

export interface NrcUltraModuleManifest {
  id: string;
  name: string;
  category: 'hud' | 'performance' | 'qol' | 'world' | 'inventory' | 'chat' | 'cosmetic';
  platform: NrcModulePlatform;
  enabledByDefault: boolean;
  compatibleLoaders: Array<'fabric' | 'forge' | 'neoforge' | 'quilt'>;
  minecraftVersions: string[];
  expensive?: boolean;
}

/** Stable metadata shared by the launcher and the eventual Minecraft-side module bridge. */
export const NRC_ULTRA_MODULE_MANIFEST: NrcUltraModuleManifest[] = [
  { id: 'fps-hud', name: 'FPS HUD', category: 'hud', platform: 'client', enabledByDefault: true, compatibleLoaders: ['fabric', 'forge', 'neoforge', 'quilt'], minecraftVersions: ['*'] },
  { id: 'coordinates', name: 'Coordinates', category: 'hud', platform: 'client', enabledByDefault: true, compatibleLoaders: ['fabric', 'forge', 'neoforge', 'quilt'], minecraftVersions: ['*'] },
  { id: 'dynamic-fps', name: 'Dynamic FPS', category: 'performance', platform: 'client', enabledByDefault: true, compatibleLoaders: ['fabric', 'forge', 'neoforge', 'quilt'], minecraftVersions: ['*'] },
  { id: 'zoom', name: 'Zoom', category: 'qol', platform: 'client', enabledByDefault: false, compatibleLoaders: ['fabric', 'forge', 'neoforge', 'quilt'], minecraftVersions: ['*'] },
  { id: 'waypoints', name: 'Waypoints', category: 'world', platform: 'client', enabledByDefault: false, compatibleLoaders: ['fabric', 'forge', 'neoforge', 'quilt'], minecraftVersions: ['*'] },
  { id: 'chat-timestamps', name: 'Chat Timestamps', category: 'chat', platform: 'client', enabledByDefault: false, compatibleLoaders: ['fabric', 'forge', 'neoforge', 'quilt'], minecraftVersions: ['*'] },
  { id: 'shulker-preview', name: 'Shulker Preview', category: 'inventory', platform: 'client', enabledByDefault: false, compatibleLoaders: ['fabric', 'forge', 'neoforge', 'quilt'], minecraftVersions: ['*'], expensive: true },
];
