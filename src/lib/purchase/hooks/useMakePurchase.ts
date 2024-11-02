import { CartItem } from "@/store/cart/types";
import { PurchaseDTO } from "../types";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/cart/useCartStore";
import { useToastStore } from "@/store/toast/useToastStore";
import { useMutation } from "@tanstack/react-query";
import { makePurchaseAPI } from "../api";
import { pageRoutes } from "@/apiRoutes";

interface MakePurchaseVariables {
  purchaseData: PurchaseDTO;
  userId: string;
  cartData: CartItem[];
}

export const useMakePurchase = () => {
  const navigate = useNavigate();
  const { resetCart } = useCartStore();
  const { addToast } = useToastStore();

  return useMutation<void, Error, MakePurchaseVariables>({
    mutationFn: ({ purchaseData, userId, cartData }) =>
      makePurchaseAPI(purchaseData, userId, cartData),
    onSuccess: (_, variables) => {
      resetCart(variables.userId);
      addToast("구매 성공!", "success");
      navigate(pageRoutes.main);
    },
    onError: (error: Error) => {
      addToast("구매 중 오류가 발생했습니다.", "error");
      console.error("구매 중 오류가 발생했습니다.", error.message);
    },
  });
};

// 각 상품의 재고 업데이트
// for (const item of cartData) {
//   const productRef = collection(db, PRODUCT_KEY);
//   const productQuery = query(productRef, where("id", "==", item.id));
//   const productSnapshot = await getDocs(productQuery);

//   if (!productSnapshot.empty) {
//     const productDoc = productSnapshot.docs[0];
//     const newStock = item.stock - item.count;
//     transcation.update(doc(db, PRODUCT_KEY, productDoc.id), {
//       stock: newStock,
//     });
//   } else {
//     console.error(`상품이 존재하지 않습니다: ID ${item.id}`);
//   }
// }
