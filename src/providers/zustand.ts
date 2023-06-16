import { create } from "zustand";

interface ZustandState {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export const useStore = create<ZustandState>((set) => ({
  searchQuery: "",
  setSearchQuery: (val: string) =>
    set(() => ({
      searchQuery: val,
    })),
}));
