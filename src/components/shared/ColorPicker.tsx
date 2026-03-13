'use client';

import { useCallback, useRef, useState } from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (hex: string) => void;
  label?: string;
  id?: string;
}

const HEX_REGEX = /^#[0-9a-fA-F]{6}$/;

export function ColorPicker({ value, onChange, label, id }: ColorPickerProps) {
  const [text, setText] = useState(value);
  const colorRef = useRef<HTMLInputElement>(null);
  const inputId = id ?? `color-${label?.replace(/\s+/g, '-').toLowerCase() ?? 'picker'}`;

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setText(v);
      if (HEX_REGEX.test(v)) {
        onChange(v);
      }
    },
    [onChange],
  );

  const handleNativeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setText(v);
      onChange(v);
    },
    [onChange],
  );

  // Sync external value changes
  if (HEX_REGEX.test(value) && value !== text && HEX_REGEX.test(text) && value !== text) {
    setText(value);
  }

  return (
    <div className="flex items-center gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs text-slate-300 whitespace-nowrap">
          {label}
        </label>
      )}
      <button
        type="button"
        className="w-6 h-6 rounded border border-slate-600 shrink-0 cursor-pointer"
        style={{ backgroundColor: HEX_REGEX.test(text) ? text : value }}
        onClick={() => colorRef.current?.click()}
        aria-label={`Pick color${label ? ` for ${label}` : ''}`}
      >
        <input
          ref={colorRef}
          type="color"
          value={HEX_REGEX.test(text) ? text : value}
          onChange={handleNativeChange}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        />
      </button>
      <input
        id={inputId}
        type="text"
        value={text}
        onChange={handleTextChange}
        className="w-[5.5rem] px-1.5 py-0.5 text-xs font-mono bg-slate-800 border border-slate-700 rounded text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="#000000"
        maxLength={7}
        spellCheck={false}
        aria-label={label ? `Hex value for ${label}` : 'Hex color value'}
      />
    </div>
  );
}
