'use client';

import { useState, useCallback } from 'react';
import { PresetSelector } from './PresetSelector';
import { ColorTokenEditor } from './ColorTokenEditor';
import { TypographyEditor } from './TypographyEditor';
import { SpacingEditor } from './SpacingEditor';
import { BorderRadiusEditor } from './BorderRadiusEditor';
import { ShadowEditor } from './ShadowEditor';
import { BreakpointEditor } from './BreakpointEditor';

type TabId = 'colors' | 'typography' | 'spacing' | 'borders' | 'shadows' | 'breakpoints';

const TABS: { id: TabId; label: string }[] = [
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Type' },
  { id: 'spacing', label: 'Space' },
  { id: 'borders', label: 'Border' },
  { id: 'shadows', label: 'Shadow' },
  { id: 'breakpoints', label: 'Screen' },
];

const TAB_CONTENT: Record<TabId, React.ComponentType> = {
  colors: ColorTokenEditor,
  typography: TypographyEditor,
  spacing: SpacingEditor,
  borders: BorderRadiusEditor,
  shadows: ShadowEditor,
  breakpoints: BreakpointEditor,
};

export function ControlsPanel() {
  const [activeTab, setActiveTab] = useState<TabId>('colors');

  const handleTabKey = useCallback(
    (e: React.KeyboardEvent) => {
      const idx = TABS.findIndex((t) => t.id === activeTab);
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveTab(TABS[(idx + 1) % TABS.length].id);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveTab(TABS[(idx - 1 + TABS.length) % TABS.length].id);
      }
    },
    [activeTab],
  );

  const ActiveComponent = TAB_CONTENT[activeTab];

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 overflow-hidden">
      {/* Presets at top */}
      <div className="px-3 pt-3 pb-2 border-b border-slate-800">
        <PresetSelector />
      </div>

      {/* Tabs */}
      <div
        className="flex border-b border-slate-800 px-1 shrink-0"
        role="tablist"
        aria-label="Token editor sections"
        onKeyDown={handleTabKey}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            className={`px-2.5 py-1.5 text-xs font-medium cursor-pointer transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'text-blue-400 border-blue-500'
                : 'text-slate-500 border-transparent hover:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="flex-1 overflow-y-auto p-3"
      >
        <ActiveComponent />
      </div>
    </div>
  );
}
