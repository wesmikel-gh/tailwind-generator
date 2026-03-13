'use client';

import { useCallback, useRef } from 'react';
import { useDesignTokenStore } from '@/stores/designTokenStore';
import { Slider } from '@/components/shared/Slider';

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

const RADIUS_ORDER = ['none', 'sm', 'DEFAULT', 'md', 'lg', 'xl', '2xl', '3xl', 'full'];

function parseRemToPx(value: string): number {
  if (value === '0' || value === '0px') return 0;
  if (value === '9999px') return 9999;
  const rem = parseFloat(value);
  if (isNaN(rem)) return 0;
  return rem * 16;
}

function RadiusRow({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (val: string) => void;
}) {
  const px = parseRemToPx(value);
  const isFull = name === 'full';

  return (
    <div className="flex items-center gap-3">
      <div
        className="w-8 h-8 bg-blue-500/20 border border-blue-500/50 shrink-0"
        style={{ borderRadius: isFull ? '9999px' : `${Math.min(px, 16)}px` }}
        aria-hidden="true"
      />
      <div className="flex-1">
        <Slider
          label={name === 'DEFAULT' ? 'default' : name}
          value={isFull ? 9999 : px}
          onChange={(v) => {
            if (isFull) return;
            if (v === 0) { onChange('0'); return; }
            onChange(`${v / 16}rem`);
          }}
          min={0}
          max={isFull ? 9999 : 48}
          step={1}
          unit="px"
          id={`radius-${name}`}
        />
      </div>
      <span className="text-[10px] font-mono text-slate-500 w-14 text-right">{value}</span>
    </div>
  );
}

export function BorderRadiusEditor() {
  const radii = useDesignTokenStore((s) => s.borders.radii);
  const setRadius = useDesignTokenStore((s) => s.setRadius);

  const debouncedSet = useDebouncedCallback(
    (key: string, value: string) => setRadius(key, value),
    150,
  );

  const orderedEntries = RADIUS_ORDER
    .filter((key) => key in radii)
    .map((key) => [key, radii[key]] as const);

  return (
    <section aria-labelledby="radius-heading" className="space-y-3">
      <h3 id="radius-heading" className="text-sm font-semibold text-slate-100">Border Radius</h3>
      <div className="space-y-2">
        {orderedEntries.map(([name, value]) => (
          <RadiusRow
            key={name}
            name={name}
            value={value}
            onChange={(val) => debouncedSet(name, val)}
          />
        ))}
      </div>
    </section>
  );
}
