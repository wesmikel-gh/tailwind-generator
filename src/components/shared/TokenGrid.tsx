'use client';

import { useCallback, useRef, useState } from 'react';

interface TokenGridProps {
  tokens: Record<string, string>;
  onEdit: (key: string, value: string) => void;
  label?: string;
  columns?: 2 | 3 | 4;
}

function TokenCell({ tokenKey, value, onEdit }: { tokenKey: string; value: string; onEdit: (key: string, value: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const commit = useCallback(() => {
    setEditing(false);
    if (draft !== value) {
      onEdit(tokenKey, draft);
    }
  }, [draft, value, tokenKey, onEdit]);

  const startEdit = useCallback(() => {
    setDraft(value);
    setEditing(true);
    requestAnimationFrame(() => inputRef.current?.select());
  }, [value]);

  return (
    <div className="flex items-center justify-between gap-1 px-2 py-1 rounded bg-slate-800/50 border border-slate-700/50">
      <span className="text-xs text-slate-400 font-mono truncate">{tokenKey}</span>
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit();
            if (e.key === 'Escape') { setDraft(value); setEditing(false); }
          }}
          className="w-20 px-1 py-0.5 text-xs font-mono bg-slate-900 border border-blue-500 rounded text-slate-100 focus:outline-none text-right"
          aria-label={`Edit value for ${tokenKey}`}
          autoFocus
        />
      ) : (
        <button
          type="button"
          onClick={startEdit}
          className="text-xs font-mono text-slate-200 hover:text-white cursor-pointer px-1 py-0.5 rounded hover:bg-slate-700 text-right"
          aria-label={`Edit ${tokenKey}: ${value}`}
        >
          {value}
        </button>
      )}
    </div>
  );
}

export function TokenGrid({ tokens, onEdit, label, columns = 3 }: TokenGridProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  }[columns];

  return (
    <div>
      {label && (
        <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">{label}</h4>
      )}
      <div className={`grid ${gridCols} gap-1`} role="list" aria-label={label ?? 'Token values'}>
        {Object.entries(tokens).map(([key, val]) => (
          <TokenCell key={key} tokenKey={key} value={val} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}
