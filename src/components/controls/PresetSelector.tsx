'use client';

import { useDesignTokenStore } from '@/stores/designTokenStore';
import type { PresetName } from '@/types/tokens';

const PRESETS: { name: PresetName; label: string; description: string; colors: string[] }[] = [
  {
    name: 'default',
    label: 'Default',
    description: 'Tailwind CSS defaults — the classic palette',
    colors: ['#3b82f6', '#6b7280', '#8b5cf6', '#64748b'],
  },
  {
    name: 'shadcn',
    label: 'shadcn/ui',
    description: 'Neutral, minimal — shadcn-inspired tokens',
    colors: ['#18181b', '#71717a', '#f4f4f5', '#09090b'],
  },
  {
    name: 'material',
    label: 'Material',
    description: 'Google Material Design 3 color system',
    colors: ['#6750a4', '#625b71', '#7d5260', '#49454f'],
  },
  {
    name: 'minimal',
    label: 'Minimal',
    description: 'Clean grayscale with single accent',
    colors: ['#111111', '#555555', '#999999', '#f5f5f5'],
  },
  {
    name: 'bold',
    label: 'Bold',
    description: 'Vibrant, high-contrast color palette',
    colors: ['#ef4444', '#f97316', '#eab308', '#22c55e'],
  },
];

export function PresetSelector() {
  const loadPreset = useDesignTokenStore((s) => s.loadPreset);
  const currentPreset = useDesignTokenStore((s) => s.meta.name);

  return (
    <section aria-labelledby="preset-heading" className="space-y-2">
      <h3 id="preset-heading" className="text-sm font-semibold text-slate-100">Presets</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5" role="radiogroup" aria-label="Design presets">
        {PRESETS.map((preset) => {
          const isActive = currentPreset.toLowerCase().includes(preset.name);
          return (
            <button
              key={preset.name}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => loadPreset(preset.name)}
              className={`text-left p-2 rounded border cursor-pointer transition-colors ${
                isActive
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              <div className="flex gap-0.5 mb-1.5">
                {preset.colors.map((c, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: c }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="text-xs font-medium text-slate-200">{preset.label}</div>
              <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{preset.description}</div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
