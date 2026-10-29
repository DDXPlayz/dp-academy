import { create } from 'zustand';

/** Transient UI state that should not survive a reload. */
interface UIState {
  searchOpen: boolean;
  drawerOpen: boolean;
  setSearch: (open: boolean) => void;
  setDrawer: (open: boolean) => void;
}

export const useUI = create<UIState>((set) => ({
  searchOpen: false,
  drawerOpen: false,
  setSearch: (searchOpen) => set({ searchOpen }),
  setDrawer: (drawerOpen) => set({ drawerOpen }),
}));
