# NRC Ultra Minecraft-side module plan

The launcher is the control plane. A separate Minecraft-side mod is the runtime plane and consumes the stable module IDs from `src/config/nrcUltra.ts`.

## First implementation wave

- FPS / frametime HUD
- Ping HUD
- Coordinates / direction HUD
- Armour HUD
- Potion effects HUD
- Dynamic FPS
- Particle control
- Entity culling integration
- Zoom
- Waypoints
- Chat timestamps
- Shulker preview
- DonutSMP session profile

## Performance principles

- Prefer client events over polling.
- Cache formatted HUD strings until their underlying value changes.
- Avoid allocations in render loops.
- Do not scan every loaded entity every frame; use visibility/culling hooks supplied by the loader/version.
- Do not enable experimental Intel-specific behaviour until it is benchmarked on real Intel Macs.

## Server safety

DonutSMP features are client-side QoL only. No automation, packet manipulation, anti-cheat bypass, duping, or other server-protection circumvention is part of NRC Ultra.
