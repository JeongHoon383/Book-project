import { useToastStore } from "@/store/toast/useToastStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductAPI } from "../api";
import { PRODUCT_KEY } from "../key";
import { useProductStore } from "@/store/product/useProductStore";
import { NewProductDTO } from "../types";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const { updateProductInStore } = useProductStore();

  return useMutation<void, Error, { id: string } & NewProductDTO>({
    mutationFn: ({ id, ...data }) => updateProductAPI(id, data),
    onSuccess: (_, updateData) => {
      addToast("상품이 수정되었습니다.", "success");
      queryClient.invalidateQueries({ queryKey: [PRODUCT_KEY] });
      updateProductInStore(updateData);
    },
    onError: (error: Error) => {
      addToast("상품 수정에 실패하였습니다.", "error");
      console.error(error);
    },
  });
};
