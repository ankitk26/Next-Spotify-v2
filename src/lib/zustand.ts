import { create } from "zustand";

interface StoreState {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  searchQuery: "",
  setSearchQuery: (value: string) =>
    set(() => ({
      searchQuery: value,
    })),
}));
