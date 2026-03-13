'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useDesignTokenStore } from '@/stores/designTokenStore';
import { loadGoogleFont, searchGoogleFonts } from '@/lib/fontLoader';
import { TokenGrid } from '@/components/shared/TokenGrid';

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

function FontFamilyInput({
  role,
  value,
  onChange,
}: {
  role: 'heading' | 'body' | 'mono';
  value: string;
  onChange: (fontName: string) => void;
}) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listId = `font-suggestions-${role}`;

  const debouncedSearch = useDebouncedCallback(async (q: string) => {
    if (q.length < 2) { setSuggestions([]); return; }
    try {
      const results = await searchGoogleFonts(q);
      setSuggestions(results.slice(0, 8));
      setShowSuggestions(true);
      setActiveIndex(-1);
    } catch {
      setSuggestions([]);
    }
  }, 250);

  const selectFont = useCallback(
    (fontName: string) => {
      setQuery(fontName);
      setSuggestions([]);
      setShowSuggestions(false);
      loadGoogleFont(fontName);
      onChange(fontName);
    },
    [onChange],
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showSuggestions || suggestions.length === 0) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        selectFont(suggestions[activeIndex]);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    },
    [showSuggestions, suggestions, activeIndex, selectFont],
  );

  return (
    <div ref={wrapperRef} className="relative">
      <label htmlFor={`font-${role}`} className="block text-xs text-slate-400 mb-0.5 capitalize">
        {role}
      </label>
      <input
        id={`font-${role}`}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          debouncedSearch(e.target.value);
        }}
        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        className="w-full px-2 py-1 text-xs bg-slate-800 border border-slate-700 rounded text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
        role="combobox"
        aria-expanded={showSuggestions}
        aria-controls={listId}
        aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
        autoComplete="off"
        spellCheck={false}
      />
      <div
        className="mt-1 text-[10px] text-slate-500 truncate h-4"
        style={{ fontFamily: value }}
        aria-hidden="true"
      >
        The quick brown fox jumps over the lazy dog
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-50 w-full mt-0.5 max-h-40 overflow-auto bg-slate-800 border border-slate-600 rounded shadow-lg"
        >
          {suggestions.map((font, i) => (
            <li
              key={font}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              className={`px-2 py-1 text-xs cursor-pointer ${
                i === activeIndex ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-slate-700'
              }`}
              onMouseDown={() => selectFont(font)}
            >
              {font}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function TypographyEditor() {
  const typography = useDesignTokenStore((s) => s.typography);
  const setFontFamily = useDesignTokenStore((s) => s.setFontFamily);
  const setFontSize = useDesignTokenStore((s) => s.setFontSize);

  const debouncedSetFamily = useDebouncedCallback(
    (role: 'heading' | 'body' | 'mono', name: string) => setFontFamily(role, name),
    150,
  );
  const debouncedSetSize = useDebouncedCallback(
    (key: string, value: string) => setFontSize(key, value),
    150,
  );

  return (
    <section aria-labelledby="typography-heading" className="space-y-3">
      <h3 id="typography-heading" className="text-sm font-semibold text-slate-100">Typography</h3>

      <div className="space-y-2">
        <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider">Font Families</h4>
        <div className="grid grid-cols-1 gap-2">
          <FontFamilyInput role="heading" value={typography.fontFamilies.heading} onChange={(n) => debouncedSetFamily('heading', n)} />
          <FontFamilyInput role="body" value={typography.fontFamilies.body} onChange={(n) => debouncedSetFamily('body', n)} />
          <FontFamilyInput role="mono" value={typography.fontFamilies.mono} onChange={(n) => debouncedSetFamily('mono', n)} />
        </div>
      </div>

      <TokenGrid
        label="Font Sizes"
        tokens={typography.fontSizes}
        onEdit={debouncedSetSize}
        columns={3}
      />

      <TokenGrid
        label="Font Weights"
        tokens={Object.fromEntries(Object.entries(typography.fontWeights).map(([k, v]) => [k, String(v)]))}
        onEdit={(key, val) => {
          const num = parseInt(val, 10);
          if (!isNaN(num)) {
            // Store writes fontWeights as numbers but we handle through fontSize action
            // We can treat this as a passthrough since the store handles weights
            debouncedSetSize(`weight-${key}`, val);
          }
        }}
        columns={3}
      />

      <TokenGrid
        label="Line Heights"
        tokens={typography.lineHeights}
        onEdit={debouncedSetSize}
        columns={3}
      />
    </section>
  );
}
