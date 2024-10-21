import { useToastStore } from "@/store/toast/useToastStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IProduct, NewProductDTO } from "../types";
import { addProductAPI } from "../api";
import { PRODUCT_KEY } from "../key";

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  return useMutation<IProduct, Error, NewProductDTO>({
    mutationFn: addProductAPI, // 상품 등록 API 호출
    onSuccess: () => {
      addToast("상품 등록 성공", "success");
      queryClient.invalidateQueries({ queryKey: [PRODUCT_KEY] });
      // 성공시 상품 목록 갱신, 등록된 상품 포함 전체 상품 업데이트
    },
    onError: (error: Error) => {
      addToast("상품 등록에 실패하였습니다.", "error");
      console.error(error);
    },
  });
};
