import { create } from "zustand";

export type SidebarLibrary = "artists" | "playlists" | "albums";

type SidebarState = {
  library: SidebarLibrary;
};

export const useSidebarStore = create<SidebarState>()(() => ({
  library: "playlists",
}));

export const updateSidebarLibrary = (updatedLibrary: SidebarLibrary) => {
  useSidebarStore.setState({ library: updatedLibrary });
};
