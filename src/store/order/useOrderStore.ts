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
  isDirectPurchase: false,

  // 초기화 함수 : 로컬스토리지에서 상태 불러오기
  initOrder: () => {
    const { product, isDirectPurchase } = getOrderFromLocalStorage();
    set({ product, isDirectPurchase });
  },

  // "바로 구매" 설정 함수
  setDirectPurchase: (product: CartItem) => {
    set({
      product,
      isDirectPurchase: true,
    });
    setOrderToLocalStorage(product, true);
  },

  // "장바구니 주문" 설정 함수
  setCartOrder: (cartProducts: CartItem[]) => {
    set({
      product: cartProducts,
      isDirectPurchase: false,
    });
    setOrderToLocalStorage(cartProducts, false);
  },

  resetOrder: () => {
    set({
      product: null,
      isDirectPurchase: false,
    });
    resetOrderAtLocalStorage();
  },
}));
