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

const BP_ORDER = ['sm', 'md', 'lg', 'xl', '2xl'];
const BP_COLORS = ['bg-blue-500/40', 'bg-green-500/40', 'bg-yellow-500/40', 'bg-orange-500/40', 'bg-red-500/40'];

function parsePx(value: string): number {
  return parseInt(value, 10) || 0;
}

export function BreakpointEditor() {
  const breakpoints = useDesignTokenStore((s) => s.breakpoints);
  const setBreakpoint = useDesignTokenStore((s) => s.setBreakpoint);

  const debouncedSet = useDebouncedCallback(
    (key: string, value: string) => setBreakpoint(key, value),
    150,
  );

  const orderedEntries = BP_ORDER
    .filter((key) => key in breakpoints)
    .map((key) => [key, breakpoints[key]] as const);

  const maxPx = Math.max(...orderedEntries.map(([, v]) => parsePx(v)), 1536);

  return (
    <section aria-labelledby="breakpoint-heading" className="space-y-3">
      <h3 id="breakpoint-heading" className="text-sm font-semibold text-slate-100">Breakpoints</h3>

      <div className="space-y-1.5">
        {orderedEntries.map(([name, value]) => (
          <div key={name} className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 w-6 text-right">{name}</span>
            <input
              type="text"
              value={value}
              onChange={(e) => debouncedSet(name, e.target.value)}
              className="w-20 px-1.5 py-0.5 text-xs font-mono bg-slate-800 border border-slate-700 rounded text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              aria-label={`Breakpoint ${name} value`}
            />
          </div>
        ))}
      </div>

      {/* Ruler visualization */}
      <div className="space-y-1 p-2 rounded bg-slate-800/30 border border-slate-800">
        <div className="text-[10px] text-slate-500 mb-1">Breakpoint ranges</div>
        <div className="relative h-6 bg-slate-900 rounded overflow-hidden">
          {orderedEntries.map(([name, value], i) => {
            const px = parsePx(value);
            const left = (px / maxPx) * 100;
            return (
              <div
                key={name}
                className={`absolute top-0 bottom-0 border-l border-slate-500 ${BP_COLORS[i]}`}
                style={{ left: `${left}%`, right: i < orderedEntries.length - 1
                  ? `${100 - (parsePx(orderedEntries[i + 1][1]) / maxPx) * 100}%`
                  : '0%' }}
                aria-hidden="true"
              >
                <span className="absolute top-0.5 left-1 text-[8px] font-mono text-slate-300 whitespace-nowrap">
                  {name} {value}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-[8px] font-mono text-slate-600">
          <span>0px</span>
          <span>{maxPx}px</span>
        </div>
      </div>
    </section>
  );
}
