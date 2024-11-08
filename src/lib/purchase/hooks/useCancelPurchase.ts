import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelPurchaseAPI } from "../api";
import { useToastStore } from "@/store/toast/useToastStore";

export const useCancelPurchase = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: cancelPurchaseAPI,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      addToast("주문 취소되었습니다.", "success");
    },
    onError: (error) => {
      console.error(error);
      addToast("상품 삭제에 실패하였습니다.", "error");
    },
  });
};
