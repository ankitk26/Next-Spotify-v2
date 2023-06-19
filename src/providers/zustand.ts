import { Track } from "@/types/types";
import { create } from "zustand";

interface ZustandState {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  currentTrack: Track | null;
  setCurrentTrack: (track: Track) => void;
}

export const useStore = create<ZustandState>((set) => ({
  searchQuery: "",
  setSearchQuery: (val: string) =>
    set(() => ({
      searchQuery: val,
    })),
  currentTrack: null,
  setCurrentTrack: (track: Track) =>
    set(() => ({
      currentTrack: track,
    })),
}));
