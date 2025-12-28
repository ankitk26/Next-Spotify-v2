import { create } from "zustand";
import type { SidebarLibrary } from "@/types/types";

type AppStoreState = {
  searchInput: string;
  library: SidebarLibrary;
};

type AppStoreActions = {
  setSearchInput: (value: string) => void;
  setSidebarLibrary: (library: SidebarLibrary) => void;
};

export const useAppStore = create<AppStoreState & AppStoreActions>()((set) => ({
  searchInput: "",
  library: "playlists",
  setSearchInput: (searchQuery: string) => set({ searchInput: searchQuery }),
  setSidebarLibrary: (library: SidebarLibrary) => set({ library }),
}));
