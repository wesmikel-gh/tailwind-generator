'use client';

import { useCallback, useState } from 'react';
import { useDesignTokenStore } from '@/stores/designTokenStore';
import { ConfigOutput } from './ConfigOutput';
import { ExportActions } from './ExportActions';

export function ExportPanel() {
  const tailwindVersion = useDesignTokenStore((s) => s.meta.tailwindVersion);
  const themeName = useDesignTokenStore((s) => s.meta.name);
  const [version, setVersion] = useState<'3' | '4'>(tailwindVersion);
  const [currentCode, setCurrentCode] = useState('');

  const handleCodeChange = useCallback((code: string) => {
    setCurrentCode(code);
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl border border-slate-700/50 overflow-hidden">
      {/* Header toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800/80 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-slate-200 tracking-wide uppercase">
            Export
          </h2>

          {/* Version toggle */}
          <div className="flex items-center bg-slate-900 rounded-md p-0.5 border border-slate-700">
            <button
              type="button"
              onClick={() => setVersion('3')}
              className={`px-3 py-1 text-xs font-medium rounded transition-all duration-200 ${
                version === '3'
                  ? 'bg-slate-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              v3
            </button>
            <button
              type="button"
              onClick={() => setVersion('4')}
              className={`px-3 py-1 text-xs font-medium rounded transition-all duration-200 ${
                version === '4'
                  ? 'bg-slate-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              v4
            </button>
          </div>
        </div>

        <span className="text-xs text-slate-500">
          {version === '3' ? 'tailwind.config.js' : '@theme CSS'}
        </span>
      </div>

      {/* Code output area */}
      <div className="flex-1 min-h-0 overflow-hidden p-3">
        <div className="h-full max-h-[600px] overflow-hidden rounded-lg border border-slate-700/50">
          <ConfigOutput version={version} onCodeChange={handleCodeChange} />
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-4 py-3 bg-slate-800/60 border-t border-slate-700/50">
        <ExportActions
          code={currentCode}
          version={version}
          themeName={themeName}
        />
      </div>
    </div>
  );
}
