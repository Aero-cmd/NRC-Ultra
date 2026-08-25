# NRC Ultra client project bootstrap

The launcher is a Tauri/React application, not a Minecraft mod project. Its package scripts build the web/Tauri launcher (`tsc && vite build`).

The Minecraft-side implementation must therefore live in a companion loader-specific project. Do not add fabricated Fabric/NeoForge mappings to this launcher repository.

## Required inputs before bootstrapping the client

- primary Minecraft version
- primary client loader (Fabric, NeoForge, or Forge)
- loader version/mappings strategy
- Java target

The launcher already produces a versioned NRC Ultra client configuration contract. The companion mod should consume that contract and reject incompatible schema/version combinations rather than silently applying settings.
