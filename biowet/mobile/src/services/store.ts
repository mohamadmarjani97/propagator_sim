import { create } from "zustand";

interface BioWetState {
  favoriteWetlandIds: string[];
  offlineMode: boolean;
  addFavorite: (wetlandId: string) => void;
  toggleOfflineMode: () => void;
}

export const useBioWetStore = create<BioWetState>((set) => ({
  favoriteWetlandIds: [],
  offlineMode: false,
  addFavorite: (wetlandId) =>
    set((state) => ({
      favoriteWetlandIds: Array.from(
        new Set([...state.favoriteWetlandIds, wetlandId]),
      ),
    })),
  toggleOfflineMode: () =>
    set((state) => ({
      offlineMode: !state.offlineMode,
    })),
}));
