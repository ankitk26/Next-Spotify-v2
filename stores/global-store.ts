import { create } from "zustand";

type GlobalState = {
  searchInput: string;
};

export const useGlobalStore = create<GlobalState>()(() => ({
  searchInput: "",
}));

export const setSearchInput = (val: string) => {
  useGlobalStore.setState({ searchInput: val });
};
