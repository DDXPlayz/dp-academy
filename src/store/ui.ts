import { create } from 'zustand';

/** Transient UI state that should not survive a reload. */
interface UIState {
  searchOpen: boolean;
  drawerOpen: boolean;
  helpOpen: boolean;
  setHelp: (open: boolean) => void;
  setSearch: (open: boolean) => void;
  setDrawer: (open: boolean) => void;
}

export const useUI = create<UIState>((set) => ({
  searchOpen: false,
  drawerOpen: false,
  helpOpen: false,
  setHelp: (helpOpen) => set({ helpOpen }),
  setSearch: (searchOpen) => set({ searchOpen }),
  setDrawer: (drawerOpen) => set({ drawerOpen }),
}));
