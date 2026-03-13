'use client';

import type { ReactNode } from 'react';
import { usePreviewState } from './usePreviewState';
import type { ViewportSize } from '@/types/tokens';

const viewportOptions: { key: ViewportSize; label: string; icon: ReactNode }[] = [
  {
    key: 'mobile',
    label: 'Mobile (375px)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    key: 'tablet',
    label: 'Tablet (768px)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    key: 'desktop',
    label: 'Desktop (full)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

const zoomLevels = [75, 100, 125, 150];

export default function PreviewToolbar() {
  const { viewport, darkMode, zoom, fullscreen, setViewport, setDarkMode, setZoom, setFullscreen } =
    usePreviewState();

  return (
    <div className="flex items-center justify-between gap-3 rounded-t-lg border border-b-0 border-zinc-200 bg-zinc-50 px-4 py-2">
      {/* Viewport toggle */}
      <div className="flex items-center gap-1 rounded-md bg-zinc-100 p-0.5">
        {viewportOptions.map((opt) => (
          <button
            key={opt.key}
            title={opt.label}
            onClick={() => setViewport(opt.key)}
            className={`rounded-md p-1.5 transition-colors ${
              viewport === opt.key
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-700'
            }`}
          >
            {opt.icon}
          </button>
        ))}
      </div>

      {/* Dark mode toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100"
        title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
        <span>{darkMode ? 'Dark' : 'Light'}</span>
      </button>

      {/* Zoom selector */}
      <div className="flex items-center gap-1">
        <span className="text-xs text-zinc-400">Zoom</span>
        <select
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm text-zinc-700 outline-none"
        >
          {zoomLevels.map((z) => (
            <option key={z} value={z}>
              {z}%
            </option>
          ))}
        </select>
      </div>

      {/* Fullscreen */}
      <button
        onClick={() => setFullscreen(!fullscreen)}
        className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100"
        title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {fullscreen ? (
            <>
              <polyline points="4 14 10 14 10 20" />
              <polyline points="20 10 14 10 14 4" />
              <line x1="14" y1="10" x2="21" y2="3" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </>
          ) : (
            <>
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </>
          )}
        </svg>
        <span className="hidden sm:inline">{fullscreen ? 'Exit' : 'Fullscreen'}</span>
      </button>
    </div>
  );
}
