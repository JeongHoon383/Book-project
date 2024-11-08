import { ALL_CATEGORY_ID } from "@/constants";
import { create } from "zustand";
import { filterStore } from "./types";

export const useFilterStore = create<filterStore>((set) => ({
  title: "",
  categoryId: ALL_CATEGORY_ID,
  searchTerm: "",

  setTitle: (title: string) => set((state) => ({ ...state, title })),
  setCategoryId: (categoryId: string) =>
    set((state) => ({ ...state, categoryId })),
  setSearchTerm: (searchTerm: string) =>
    set((state) => ({ ...state, searchTerm })),
}));
