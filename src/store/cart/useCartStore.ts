import { create } from "zustand";
import { CartItem, CartStore } from "./types";
import {
  calculateTotal,
  getCartFromLocalStorage,
  resetCartAtLocalStorage,
  setCartToLocalStorage,
} from "./cartUtils";

export const useCartStore = create<CartStore>((set) => ({
  cart: [] as CartItem[],
  totalCount: 0,
  totalPrice: 0,

  initCart: (userId: string) => {
    if (!userId) return;

    const prevCartItems = getCartFromLocalStorage(userId);
    const total = calculateTotal(prevCartItems);

    set({
      cart: prevCartItems,
      totalCount: total.totalCount,
      totalPrice: total.totalPrice,
    });
  },

  resetCart: (userId: string) => {
    resetCartAtLocalStorage(userId);

    set({
      cart: [],
      totalCount: 0,
      totalPrice: 0,
    });
  },

  addCartItem: (item: CartItem, userId: string, count: number) => {
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      let updatedCart: CartItem[];

      if (existingItemIndex !== -1) {
        updatedCart = state.cart.map((cartItem, index) =>
          index === existingItemIndex
            ? {
                ...cartItem,
                count: cartItem.count + count,
                stock: cartItem.stock - 1,
              }
            : cartItem
        ); // 중복이 된다면
      } else {
        updatedCart = [
          ...state.cart,
          { ...item, count, stock: item.stock - 1 },
        ];
      }

      const total = calculateTotal(updatedCart);

      setCartToLocalStorage(updatedCart, userId);

      return {
        cart: updatedCart,
        totalCount: total.totalCount,
        totalPrice: total.totalPrice,
      };
    });
  },

  increaseItemCount: (itemId: string) => {
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === itemId
          ? { ...item, count: item.count + 1, stock: item.stock - 1 }
          : item
      );
      const total = calculateTotal(updatedCart);

      return {
        cart: updatedCart,
        totalCount: total.totalCount,
        totalPrice: total.totalPrice,
      };
    });
  },

  decreaseItemCount: (itemId: string) => {
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === itemId && item.count > 1
          ? { ...item, count: item.count - 1, stock: item.stock + 1 }
          : item
      );
      const total = calculateTotal(updatedCart);

      return {
        cart: updatedCart,
        totalCount: total.totalCount,
        totalPrice: total.totalPrice,
      };
    });
  },

  removeCartItem: (itemId: string, userId: string) => {
    set((state) => {
      const updatedCart = state.cart.filter(
        (cartItem) => cartItem.id !== itemId
      );

      const total = calculateTotal(updatedCart);

      setCartToLocalStorage(updatedCart, userId);

      return {
        cart: updatedCart,
        totalCount: total.totalCount,
        totalPrice: total.totalPrice,
      };
    });
  },
}));
