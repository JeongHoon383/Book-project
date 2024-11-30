import { useToastStore } from "@/store/toast/useToastStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IProduct, NewProductDTO } from "../types";
import { PRODUCT_KEY } from "../key";
import { addProductAPI } from "../api";
import { useProductStore } from "@/store/product/useProductStore";

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const { addProduct } = useProductStore();

  return useMutation<IProduct, Error, NewProductDTO>({
    mutationFn: addProductAPI,
    onSuccess: (products) => {
      queryClient.invalidateQueries({ queryKey: [PRODUCT_KEY] });
      addProduct(products);
      addToast("상품 등록 성공!", "success");
    },
    onError: (error: Error) => {
      console.error(error);
      addToast("상품 등록에 실패하였습니다.", "error");
    },
  });
};
