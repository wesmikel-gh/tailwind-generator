'use client';

import { useCallback, useRef, useState } from 'react';
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

const SHADOW_ORDER = ['sm', 'DEFAULT', 'md', 'lg', 'xl', '2xl', 'inner', 'none'];

function ShadowRow({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (val: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const commit = useCallback(() => {
    setEditing(false);
    if (draft !== value) onChange(draft);
  }, [draft, value, onChange]);

  const startEdit = useCallback(() => {
    setDraft(value);
    setEditing(true);
    requestAnimationFrame(() => inputRef.current?.select());
  }, [value]);

  return (
    <div className="flex items-start gap-3 p-2 rounded bg-slate-800/30 border border-slate-800">
      <div className="shrink-0">
        <div
          className="w-16 h-12 bg-slate-700 rounded"
          style={{ boxShadow: value === 'none' ? 'none' : value }}
          aria-hidden="true"
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium text-slate-300 block mb-1">
          {name === 'DEFAULT' ? 'default' : name}
        </span>
        {editing ? (
          <textarea
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); commit(); }
              if (e.key === 'Escape') { setDraft(value); setEditing(false); }
            }}
            className="w-full px-1.5 py-1 text-[10px] font-mono bg-slate-900 border border-blue-500 rounded text-slate-100 focus:outline-none resize-none"
            rows={2}
            aria-label={`Edit shadow value for ${name}`}
            autoFocus
          />
        ) : (
          <button
            type="button"
            onClick={startEdit}
            className="text-left w-full text-[10px] font-mono text-slate-400 hover:text-slate-200 cursor-pointer truncate"
            aria-label={`Edit shadow ${name}: ${value}`}
          >
            {value}
          </button>
        )}
      </div>
    </div>
  );
}

export function ShadowEditor() {
  const shadows = useDesignTokenStore((s) => s.shadows);
  const setShadow = useDesignTokenStore((s) => s.setShadow);

  const debouncedSet = useDebouncedCallback(
    (key: string, value: string) => setShadow(key, value),
    150,
  );

  const orderedEntries = SHADOW_ORDER
    .filter((key) => key in shadows)
    .map((key) => [key, shadows[key]] as const);

  return (
    <section aria-labelledby="shadow-heading" className="space-y-3">
      <h3 id="shadow-heading" className="text-sm font-semibold text-slate-100">Shadows</h3>
      <div className="space-y-1.5">
        {orderedEntries.map(([name, value]) => (
          <ShadowRow
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
