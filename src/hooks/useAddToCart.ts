// src/hooks/useAddToCart.ts
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import { IProduct } from "@/lib/product/types";
import { CartItem } from "@/store/cart/types";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useCartStore } from "@/store/cart/useCartStore";
import { useToastStore } from "@/store/toast/useToastStore";

export const useAddToCart = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isLogin = useAuthStore((state) => state.isLogin);
  const addCartItem = useCartStore((state) => state.addCartItem);
  const addToast = useToastStore((state) => state.addToast);

  const handleAddToCart = useCallback(
    (product: IProduct): void => {
      if (!isLogin) {
        navigate(pageRoutes.login);
        return;
      }

      const cartItem: CartItem = { ...product, count: 1 };
      addCartItem(cartItem, user!.id, 1); // user가 로그인된 상태이므로 non-null 확정
      addToast("상품이 장바구니에 담겼습니다.", "success");
    },
    [isLogin, user, addCartItem, addToast, navigate]
  );

  return handleAddToCart;
};
