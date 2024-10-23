import { useToastStore } from "@/store/toast/useToastStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IProduct, NewProductDTO } from "../types";
import { addProductAPI } from "../api";
import { PRODUCT_KEY } from "../key";
import { useProductStore } from "@/store/product/useProductStore";

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  // Zustand의 products 상태와 상태 갱신 함수
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);

  return useMutation<IProduct, Error, NewProductDTO>({
    mutationFn: addProductAPI, // 상품 등록 API 호출
    onSuccess: (newProduct) => {
      addToast("상품 등록 성공", "success");

      // React Query 캐시 무효화
      queryClient.invalidateQueries({ queryKey: [PRODUCT_KEY] });
      // 상태 업데이트 - 상품을 목록의 가장 앞에 추가
      setProducts([newProduct, ...products]);
    },
    onError: (error: Error) => {
      addToast("상품 등록에 실패하였습니다.", "error");
      console.error(error);
    },
  });
};
