'use client';

import { ControlsPanel } from '@/components/controls/ControlsPanel';
import PreviewToolbar from '@/components/preview/PreviewToolbar';
import PreviewShell from '@/components/preview/PreviewShell';
import { ExportPanel } from '@/components/export/ExportPanel';

import TypographySpecimen from '@/components/preview/specimens/TypographySpecimen';
import ButtonSpecimen from '@/components/preview/specimens/ButtonSpecimen';
import CardSpecimen from '@/components/preview/specimens/CardSpecimen';
import FormSpecimen from '@/components/preview/specimens/FormSpecimen';
import NavSpecimen from '@/components/preview/specimens/NavSpecimen';
import AlertSpecimen from '@/components/preview/specimens/AlertSpecimen';
import BadgeSpecimen from '@/components/preview/specimens/BadgeSpecimen';
import TableSpecimen from '@/components/preview/specimens/TableSpecimen';
import LayoutSpecimen from '@/components/preview/specimens/LayoutSpecimen';

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-100">
      {/* Left: Controls Panel */}
      <aside className="w-80 shrink-0 overflow-hidden border-r border-zinc-200">
        <ControlsPanel />
      </aside>

      {/* Center: Preview */}
      <main className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <PreviewToolbar />
        <div className="flex-1 overflow-auto bg-zinc-50 p-4">
          <PreviewShell>
            <TypographySpecimen />
            <ButtonSpecimen />
            <BadgeSpecimen />
            <AlertSpecimen />
            <CardSpecimen />
            <NavSpecimen />
            <FormSpecimen />
            <TableSpecimen />
            <LayoutSpecimen />
          </PreviewShell>
        </div>
      </main>

      {/* Right: Export Panel */}
      <aside className="w-96 shrink-0 overflow-hidden border-l border-zinc-200 bg-slate-900">
        <ExportPanel />
      </aside>
    </div>
  );
}
