import { create } from "zustand";
import { CartItem } from "../cart/types";
import {
  getOrderFromLocalStorage,
  resetOrderAtLocalStorage,
  setOrderToLocalStorage,
} from "./orderUtils";
import { OrderStore } from "./types";

export const useOrderStore = create<OrderStore>((set) => ({
  product: null, // "바로 구매" 또는 "장바구니 주문" 상품을 저장

  // 초기화 함수 : 로컬스토리지에서 상태 불러오기
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
