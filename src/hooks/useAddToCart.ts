// src/hooks/useAddToCart.ts
import { useCallback } from "react";
import { IProduct } from "@/lib/product/types";
import { CartItem } from "@/store/cart/types";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useCartStore } from "@/store/cart/useCartStore";
import { useToastStore } from "@/store/toast/useToastStore";

export const useAddToCart = () => {
  const user = useAuthStore((state) => state.user);
  const addCartItem = useCartStore((state) => state.addCartItem);
  const addToast = useToastStore((state) => state.addToast);

  const handleAddToCart = useCallback(
    (product: IProduct): void => {
      if (user?.isSeller === true) {
        addToast(
          "구매 전용 기능입니다. 구매자 계정으로 로그인하여 이용해 주세요",
          "error"
        );
        return;
      }

      const cartItem: CartItem = { ...product, count: 1 };
      addCartItem(cartItem, user!.id, 1); // user가 로그인된 상태이므로 non-null 확정
      addToast("상품이 장바구니에 담겼습니다.", "success");
    },
    [user, addCartItem, addToast]
  );

  return handleAddToCart;
};
