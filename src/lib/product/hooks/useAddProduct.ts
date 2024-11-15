import { useToastStore } from "@/store/toast/useToastStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IProduct, NewProductDTO } from "../types";
import { PRODUCT_KEY } from "../key";
import { addProductAPI } from "../api";
import { useProductStore } from "@/store/product/useProductStore";
// 리액트 쿼리로 데이터 요청 API 호출

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  // 데이터를 보여줄 때 캐싱된 데이터를 보여주기 위함
  // 데이터를 불러올 때 캐싱된 데이터를 무효화
  const { addToast } = useToastStore();
  const { addProduct } = useProductStore();

  return useMutation<IProduct, Error, NewProductDTO>({
    // IProduct - 서버한테 받는 데이터 타입
    // NewProductDTO - 서버로 보내는 데이터 타입
    mutationFn: addProductAPI, // 상품 등록 API 호출
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
