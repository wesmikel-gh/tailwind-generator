import { create } from 'zustand';
import type { ViewportSize } from '@/types/tokens';

interface PreviewState {
  viewport: ViewportSize;
  darkMode: boolean;
  zoom: number;
  fullscreen: boolean;
  setViewport: (viewport: ViewportSize) => void;
  setDarkMode: (dark: boolean) => void;
  setZoom: (zoom: number) => void;
  setFullscreen: (fullscreen: boolean) => void;
}

export const usePreviewState = create<PreviewState>((set) => ({
  viewport: 'desktop',
  darkMode: false,
  zoom: 100,
  fullscreen: false,
  setViewport: (viewport) => set({ viewport }),
  setDarkMode: (darkMode) => set({ darkMode }),
  setZoom: (zoom) => set({ zoom }),
  setFullscreen: (fullscreen) => set({ fullscreen }),
}));
