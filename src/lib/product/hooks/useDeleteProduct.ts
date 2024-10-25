import { useToastStore } from "@/store/toast/useToastStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductAPI } from "../api";
import { useProductStore } from "@/store/product/useProductStore";
import { PRODUCT_KEY } from "../key";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  return useMutation({
    mutationFn: deleteProductAPI,
    onSuccess: (_, deleteProductId: string) => {
      addToast("상품이 삭제되었습니다.", "success");
      queryClient.invalidateQueries({ queryKey: [PRODUCT_KEY] });
      deleteProduct(deleteProductId);
    },
    onError: (error) => {
      addToast("상품 삭제에 실패하였습니다.", "error");
      console.error(error);
    },
  });
};
