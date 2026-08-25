# NRC Ultra architecture

The launcher owns configuration, profiles, persistence, and UI. Minecraft-side functionality should consume the same module identifiers rather than duplicating settings.

```text
Launcher UI
  -> persistent module store
  -> server/profile selection
  -> module action state
  -> Minecraft/client bridge
  -> in-game module implementations
```

A module ID is the stable contract between layers. Avoid putting Minecraft rendering or gameplay logic in React components.

## Performance rule

The launcher should never continuously poll Minecraft state when an event-driven bridge can provide the same information. Expensive work must be opt-in and measurable.
