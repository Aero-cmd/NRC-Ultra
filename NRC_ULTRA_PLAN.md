# NRC Ultra

NRC Ultra is a performance-first NoRisk Client fork focused on polished UI, Intel macOS optimisation, modular client-side QoL features, and a dedicated DonutSMP profile.

## Phase 1
- Rebrand launcher identity and metadata
- Establish performance profile definitions
- Establish module registry/configuration contract
- Add DonutSMP profile defaults
- Add Intel macOS build/profile documentation

## Design principles
- Keep expensive work off the React render path.
- Prefer Rust/Tauri for persistent/background work.
- Keep launcher animations optional and cheap.
- Make modules independently enableable and measurable.
- DonutSMP features remain client-side QoL and do not bypass server protections.
- Preserve GPL-3.0 requirements from upstream.

## Planned module groups
HUD, Performance, Chat, Inventory, World, PvP/QoL, Screenshots, Cosmetics, and DonutSMP.
