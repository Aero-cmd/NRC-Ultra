import { useMemo } from 'react';
import { NRC_ULTRA_MODULES, type NrcModuleCategory } from '../../config/nrcUltra';
import { NRC_ULTRA_MODULE_CATEGORIES, getModulesByCategory } from '../../config/nrcUltraModuleCatalog';
import { useNrcUltraModuleStore } from '../../store/nrc-ultra-module-store';

const labels: Record<NrcModuleCategory, string> = {
  hud: 'HUD', performance: 'Performance', chat: 'Chat', inventory: 'Inventory',
  world: 'World', qol: 'QoL', cosmetics: 'Cosmetics',
};

export function NrcUltraTab() {
  const state = useNrcUltraModuleStore((s) => s.moduleState);
  const setEnabled = useNrcUltraModuleStore((s) => s.setModuleEnabled);
  const reset = useNrcUltraModuleStore((s) => s.reset);

  const enabledCount = useMemo(() => Object.values(state).filter(Boolean).length, [state]);

  return (
    <div className="flex h-full flex-col gap-6 overflow-auto p-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest opacity-60">NRC Ultra</p>
        <h1 className="mt-1 text-3xl font-bold">Modules</h1>
        <p className="mt-2 text-sm opacity-60">{enabledCount} of {NRC_ULTRA_MODULES.length} modules enabled.</p>
      </header>

      {NRC_ULTRA_MODULE_CATEGORIES.map((category) => {
        const modules = getModulesByCategory(category);
        return (
          <section key={category} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h2 className="mb-3 text-sm font-semibold">{labels[category]}</h2>
            <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
              {modules.map((module) => {
                const enabled = state[module.id] === true;
                return (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => setEnabled(module.id, !enabled)}
                    className={`rounded-lg border p-3 text-left transition ${enabled ? 'border-white/20 bg-white/[0.08]' : 'border-white/5 bg-white/[0.02] opacity-70'}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium">{module.name}</span>
                      <span className="text-xs opacity-50">{enabled ? 'ON' : 'OFF'}</span>
                    </div>
                    <p className="mt-1 text-xs opacity-50">{module.description}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-wide opacity-40">Cost: {module.performanceCost}</p>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}

      <button type="button" onClick={reset} className="self-start rounded-lg border border-white/10 px-4 py-2 text-sm opacity-70 hover:opacity-100">
        Reset modules
      </button>
    </div>
  );
}
