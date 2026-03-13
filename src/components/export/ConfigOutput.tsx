'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useDesignTokenStore } from '@/stores/designTokenStore';
import { useShallow } from 'zustand/react/shallow';
import { generateTailwindV3Config } from '@/lib/generateTailwindConfig';
import { generateTailwindV4Theme } from '@/lib/generateCSSTheme';
import type { DesignTokens } from '@/types/tokens';

interface ConfigOutputProps {
  version: '3' | '4';
  onCodeChange?: (code: string) => void;
}

/**
 * Extracts a DesignTokens object from the flat store state.
 * The store spreads DesignTokens props at the top level alongside actions.
 */
function selectTokens(s: DesignTokens): DesignTokens {
  return {
    colors: s.colors,
    typography: s.typography,
    spacing: s.spacing,
    borders: s.borders,
    shadows: s.shadows,
    breakpoints: s.breakpoints,
    container: s.container,
    transitions: s.transitions,
    meta: s.meta,
  };
}

export function ConfigOutput({ version, onCodeChange }: ConfigOutputProps) {
  const tokens = useDesignTokenStore(useShallow(selectTokens));
  const [highlightedHtml, setHighlightedHtml] = useState<string>('');
  const [isHighlighting, setIsHighlighting] = useState(true);
  const [shikiFailed, setShikiFailed] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const code = useMemo(() => {
    return version === '3'
      ? generateTailwindV3Config(tokens)
      : generateTailwindV4Theme(tokens);
  }, [tokens, version]);

  const filename = version === '3' ? 'tailwind.config.js' : 'theme.css';
  const language = version === '3' ? 'javascript' : 'css';

  // Notify parent of code changes
  useEffect(() => {
    onCodeChange?.(code);
  }, [code, onCodeChange]);

  // Syntax highlighting with shiki
  useEffect(() => {
    let cancelled = false;

    async function highlight() {
      setIsHighlighting(true);
      try {
        const { codeToHtml } = await import('shiki');
        const html = await codeToHtml(code, {
          lang: language,
          theme: 'github-dark',
        });
        if (!cancelled) {
          setHighlightedHtml(html);
          setShikiFailed(false);
        }
      } catch {
        if (!cancelled) {
          setShikiFailed(true);
        }
      } finally {
        if (!cancelled) {
          setIsHighlighting(false);
        }
      }
    }

    highlight();
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  // Line numbers for fallback view
  const lineCount = code.split('\n').length;

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* File tab header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700 rounded-t-lg">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-2 text-xs font-mono text-slate-400">{filename}</span>
        {isHighlighting && (
          <span className="ml-auto text-xs text-slate-500 animate-pulse">
            Highlighting...
          </span>
        )}
      </div>

      {/* Code area */}
      <div
        ref={codeRef}
        className="flex-1 overflow-auto bg-[#0d1117] rounded-b-lg"
        style={{ maxHeight: '100%' }}
      >
        {!shikiFailed && highlightedHtml ? (
          <div
            className="shiki-output font-mono text-sm leading-6 p-4 [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_code]:!bg-transparent [&_.line]:before:content-[counter(line)] [&_.line]:before:counter-increment-[line] [&_.line]:before:inline-block [&_.line]:before:w-8 [&_.line]:before:mr-4 [&_.line]:before:text-right [&_.line]:before:text-slate-600 [&_.line]:before:select-none"
            style={{ counterReset: 'line' }}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <div className="flex font-mono text-sm leading-6 p-4">
            {/* Line numbers column */}
            <div
              className="select-none text-right pr-4 text-slate-600 shrink-0"
              aria-hidden="true"
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            {/* Code column */}
            <pre className="flex-1 overflow-x-auto text-slate-300 whitespace-pre">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
