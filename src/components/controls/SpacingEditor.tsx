'use client';

import { useCallback, useRef } from 'react';
import { useDesignTokenStore } from '@/stores/designTokenStore';

function useDebouncedCallback<T extends (...args: never[]) => void>(fn: T, delay: number): T {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  return useCallback(
    (...args: Parameters<T>) => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => fn(...args), delay);
    },
    [fn, delay],
  ) as unknown as T;
}

function SpacingBlock({ name, value }: { name: string; value: string }) {
  const rem = parseFloat(value) || 0;
  const px = rem * 16;

  return (
    <div className="flex items-center gap-2 py-0.5">
      <span className="text-[10px] font-mono text-slate-400 w-8 text-right shrink-0">{name}</span>
      <div
        className="h-4 rounded-sm bg-blue-500/30 border border-blue-500/50 shrink-0 transition-all duration-200"
        style={{ width: `${Math.min(px, 200)}px` }}
        aria-hidden="true"
      />
      <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">{value}</span>
    </div>
  );
}

export function SpacingEditor() {
  const spacing = useDesignTokenStore((s) => s.spacing);
  const setSpacingBase = useDesignTokenStore((s) => s.setSpacingBase);

  const debouncedSetBase = useDebouncedCallback(
    (base: number) => setSpacingBase(base),
    150,
  );

  const sortedEntries = Object.entries(spacing.scale).sort((a, b) => {
    const aNum = parseFloat(a[1]);
    const bNum = parseFloat(b[1]);
    return aNum - bNum;
  });

  return (
    <section aria-labelledby="spacing-heading" className="space-y-3">
      <h3 id="spacing-heading" className="text-sm font-semibold text-slate-100">Spacing</h3>

      <div className="flex items-center gap-2">
        <label htmlFor="spacing-base" className="text-xs text-slate-300">
          Base unit (px):
        </label>
        <input
          id="spacing-base"
          type="number"
          min={1}
          max={16}
          step={1}
          value={spacing.baseUnit}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            if (!isNaN(v) && v > 0) debouncedSetBase(v);
          }}
          className="w-16 px-1.5 py-0.5 text-xs font-mono bg-slate-800 border border-slate-700 rounded text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <span className="text-[10px] text-slate-500">
          1 unit = {spacing.baseUnit}px = {spacing.baseUnit / 16}rem
        </span>
      </div>

      <div className="space-y-0.5 p-2 rounded bg-slate-800/30 border border-slate-800" role="list" aria-label="Spacing scale">
        {sortedEntries.map(([name, value]) => (
          <SpacingBlock key={name} name={name} value={value} />
        ))}
      </div>
    </section>
  );
}
