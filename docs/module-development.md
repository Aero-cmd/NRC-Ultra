# NRC Ultra module development

Modules should remain small, declarative, and independently toggleable.

## Rules

1. Put user-facing metadata in `src/config/nrcUltra.ts`.
2. Keep module state separate from rendering and Minecraft implementation details.
3. Mark expensive modules with a realistic performance cost.
4. Prefer event-driven updates over per-frame work when possible.
5. Do not duplicate server-specific logic across modules; use server profiles.
6. DonutSMP modules must remain client-side QoL and must not bypass server protections, automate gameplay, or interfere with anti-cheat.

The launcher can use the catalogue to build settings UI and profiles while the Minecraft implementation lives in the appropriate client/mod layer.
