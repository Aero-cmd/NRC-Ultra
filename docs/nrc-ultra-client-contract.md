# NRC Ultra client contract

The launcher produces a versioned client configuration for the companion Minecraft client.

## Contract

- `schemaVersion`: integer protocol version
- `instanceId`: launcher profile/instance ID
- `minecraftVersion`: exact Minecraft version selected by the user
- `loader`: selected client loader
- `serverProfile`: detected NRC Ultra server profile
- `performanceProfile`: selected performance preset
- `enabledModules`: module ID -> enabled state

## Rules

1. The Minecraft client must reject unsupported schema versions rather than silently ignoring fields.
2. Unknown module IDs are ignored by the client and preserved by the launcher.
3. The launcher remains authoritative for instance selection, content installation, and loader selection.
4. The Minecraft client remains authoritative for runtime module state and rendering.
5. No module may modify server state or automate gameplay merely because it is enabled in the manifest.

The first companion client should target one explicitly selected Minecraft/loader combination. Additional versions/loaders can then consume the same schema with their own adapters.