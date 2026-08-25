# Intel macOS optimisation

NRC Ultra treats Intel Macs as a first-class target instead of a fallback build.

## Goals

- Keep launcher CPU usage low while Minecraft is running.
- Avoid unnecessary React redraws and animation loops.
- Prefer cached/virtualised lists for large module and instance views.
- Keep expensive persistence and filesystem work in the Tauri/Rust layer.
- Use conservative concurrency for background work on lower-core Intel systems.
- Provide a dedicated `Intel Mac — DonutSMP` profile.

## Minecraft-side guidance

The profile should favour stable frametimes over a headline FPS number. Rendering and entity work should be reduced before lowering input/UI responsiveness.

These values are starting defaults, not hardware-specific guarantees; they should be benchmarked on real Intel Mac hardware before being presented as optimal.
