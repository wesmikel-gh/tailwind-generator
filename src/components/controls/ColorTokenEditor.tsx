'use client';

import { useCallback, useRef, useState } from 'react';
import { useDesignTokenStore } from '@/stores/designTokenStore';
import { checkContrast } from '@/lib/contrastChecker';
import { ColorPicker } from '@/components/shared/ColorPicker';
import { SEMANTIC_COLOR_NAMES, SHADE_KEYS, type SemanticColorName, type ShadeKey, type ColorScale } from '@/types/tokens';

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

function ContrastBadge({ fg, bg, label }: { fg: string; bg: string; label: string }) {
  const result = checkContrast(fg, bg);
  return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-mono">
      <span className="text-slate-500">{label}:</span>
      <span className={result.aa ? 'text-green-400' : 'text-red-400'}>
        {result.aa ? 'AA' : 'Fail'}
      </span>
      <span className={result.aaa ? 'text-green-400' : 'text-yellow-500'}>
        {result.aaa ? 'AAA' : ''}
      </span>
    </span>
  );
}

function ShadeStrip({
  scale,
  colorName,
  onShadeClick,
}: {
  scale: ColorScale;
  colorName: string;
  onShadeClick: (shade: ShadeKey) => void;
}) {
  return (
    <div className="flex gap-px" role="list" aria-label={`${colorName} shade swatches`}>
      {SHADE_KEYS.map((shade) => (
        <button
          key={shade}
          type="button"
          className="flex-1 h-6 rounded-sm cursor-pointer hover:ring-1 hover:ring-white/50 transition-shadow focus:outline-none focus:ring-1 focus:ring-blue-500"
          style={{ backgroundColor: scale[shade] }}
          onClick={() => onShadeClick(shade)}
          aria-label={`${colorName}-${shade}: ${scale[shade]}`}
          title={`${shade}: ${scale[shade]}`}
        />
      ))}
    </div>
  );
}

function ColorRow({
  name,
  scale,
  isCustom,
}: {
  name: string;
  scale: ColorScale;
  isCustom?: boolean;
}) {
  const setColorBase = useDesignTokenStore((s) => s.setColorBase);
  const setColorShade = useDesignTokenStore((s) => s.setColorShade);
  const removeCustomColor = useDesignTokenStore((s) => s.removeCustomColor);
  const [editingShade, setEditingShade] = useState<ShadeKey | null>(null);

  const debouncedSetBase = useDebouncedCallback(
    (n: string, hex: string) => setColorBase(n, hex),
    150,
  );
  const debouncedSetShade = useDebouncedCallback(
    (n: string, shade: ShadeKey, hex: string) => setColorShade(n, shade, hex),
    150,
  );

  const handleShadeClick = useCallback((shade: ShadeKey) => {
    setEditingShade((prev) => (prev === shade ? null : shade));
  }, []);

  return (
    <div className="space-y-1 p-2 rounded bg-slate-800/30 border border-slate-800">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-200 capitalize min-w-[5rem]">{name}</span>
          <ColorPicker
            value={scale.base}
            onChange={(hex) => debouncedSetBase(name, hex)}
            label="Base"
            id={`color-base-${name}`}
          />
        </div>
        <div className="flex items-center gap-2">
          <ContrastBadge fg="#ffffff" bg={scale['500']} label="W" />
          <ContrastBadge fg="#111111" bg={scale['500']} label="D" />
          {isCustom && (
            <button
              type="button"
              onClick={() => removeCustomColor(name)}
              className="text-xs text-red-400 hover:text-red-300 px-1 cursor-pointer"
              aria-label={`Remove custom color ${name}`}
            >
              Remove
            </button>
          )}
        </div>
      </div>

      <ShadeStrip scale={scale} colorName={name} onShadeClick={handleShadeClick} />

      {editingShade && (
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] text-slate-400 font-mono">{editingShade}:</span>
          <ColorPicker
            value={scale[editingShade]}
            onChange={(hex) => debouncedSetShade(name, editingShade, hex)}
            id={`color-shade-${name}-${editingShade}`}
          />
          <button
            type="button"
            onClick={() => setEditingShade(null)}
            className="text-[10px] text-slate-500 hover:text-slate-300 cursor-pointer"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export function ColorTokenEditor() {
  const colors = useDesignTokenStore((s) => s.colors);
  const addCustomColor = useDesignTokenStore((s) => s.addCustomColor);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newHex, setNewHex] = useState('#6366f1');

  const handleAdd = useCallback(() => {
    const trimmed = newName.trim().toLowerCase().replace(/\s+/g, '-');
    if (trimmed) {
      addCustomColor(trimmed, newHex);
      setNewName('');
      setNewHex('#6366f1');
      setShowAdd(false);
    }
  }, [newName, newHex, addCustomColor]);

  return (
    <section aria-labelledby="color-editor-heading" className="space-y-2">
      <h3 id="color-editor-heading" className="text-sm font-semibold text-slate-100">Colors</h3>

      <div className="space-y-1.5">
        {SEMANTIC_COLOR_NAMES.map((name) => (
          <ColorRow key={name} name={name} scale={colors[name]} />
        ))}
      </div>

      {Object.keys(colors.custom).length > 0 && (
        <div className="space-y-1.5 pt-1">
          <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider">Custom Colors</h4>
          {Object.entries(colors.custom).map(([name, scale]) => (
            <ColorRow key={name} name={name} scale={scale as import('@/types/tokens').ColorScale} isCustom />
          ))}
        </div>
      )}

      {showAdd ? (
        <div className="flex items-center gap-2 p-2 rounded bg-slate-800 border border-slate-700">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Color name"
            className="w-28 px-1.5 py-0.5 text-xs bg-slate-900 border border-slate-700 rounded text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); }}
            aria-label="New custom color name"
            autoFocus
          />
          <ColorPicker value={newHex} onChange={setNewHex} id="new-custom-color" />
          <button
            type="button"
            onClick={handleAdd}
            className="px-2 py-0.5 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded cursor-pointer"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setShowAdd(false)}
            className="text-xs text-slate-500 hover:text-slate-300 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowAdd(true)}
          className="w-full py-1.5 text-xs text-slate-400 hover:text-slate-200 border border-dashed border-slate-700 hover:border-slate-600 rounded cursor-pointer transition-colors"
        >
          + Add Custom Color
        </button>
      )}
    </section>
  );
}
