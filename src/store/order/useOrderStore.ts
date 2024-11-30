import { create } from "zustand";
import { CartItem } from "../cart/types";
import {
  getOrderFromLocalStorage,
  resetOrderAtLocalStorage,
  setOrderToLocalStorage,
} from "./orderUtils";
import { OrderStore } from "./types";

export const useOrderStore = create<OrderStore>((set) => ({
  product: null,

  initOrder: () => {
    const { product } = getOrderFromLocalStorage();
    set({ product });
  },

  setOrder: (products: CartItem | CartItem[]) => {
    const productArray = Array.isArray(products) ? products : [products];
    set({
      product: productArray,
    });
    setOrderToLocalStorage(productArray);
  },

  resetOrder: () => {
    set({
      product: null,
    });
    resetOrderAtLocalStorage();
  },
}));
