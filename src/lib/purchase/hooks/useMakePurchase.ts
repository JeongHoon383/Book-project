import { CartItem } from "@/store/cart/types";
import { PurchaseDTO } from "../types";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/cart/useCartStore";
import { useToastStore } from "@/store/toast/useToastStore";
import { useMutation } from "@tanstack/react-query";
import { makePurchaseAPI } from "../api";
import { pageRoutes } from "@/apiRoutes";
import { useOrderStore } from "@/store/order/useOrderStore";

interface MakePurchaseVariables {
  purchaseData: PurchaseDTO;
  userId: string;
  orderData: CartItem[] | null;
}

export const useMakePurchase = () => {
  const navigate = useNavigate();
  const { resetOrder } = useOrderStore();
  const { resetCart } = useCartStore();
  const { addToast } = useToastStore();

  return useMutation<void, Error, MakePurchaseVariables>({
    mutationFn: ({ purchaseData, userId, orderData }) =>
      makePurchaseAPI(purchaseData, userId, orderData),
    onSuccess: (_, variables) => {
      resetCart(variables.userId);
      resetOrder();
      addToast("구매 성공!", "success");
      navigate(pageRoutes.main);
    },
    onError: (error: Error) => {
      console.error("구매 중 오류가 발생했습니다.", error.message);
      addToast("구매 중 오류가 발생했습니다.", "error");
    },
  });
};
