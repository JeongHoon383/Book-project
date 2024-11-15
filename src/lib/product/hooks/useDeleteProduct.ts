import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductAPI } from "../api";
import { useProductStore } from "@/store/product/useProductStore";
import { PRODUCT_KEY } from "../key";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  return useMutation({
    mutationFn: deleteProductAPI,
    onSuccess: (_, deleteProductId: string) => {
      queryClient.invalidateQueries({ queryKey: [PRODUCT_KEY] });
      deleteProduct(deleteProductId);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
