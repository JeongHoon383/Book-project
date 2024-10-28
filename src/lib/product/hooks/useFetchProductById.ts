// 새로운 API 함수 작성
import { useQuery } from "@tanstack/react-query";
import { fetchProductByIdAPI } from "../api";
import { PRODUCT_KEY } from "../key";

// 새로운 훅 작성
export const useFetchProductById = (productId: string) => {
  return useQuery({
    queryKey: [PRODUCT_KEY, productId],
    queryFn: () => fetchProductByIdAPI(productId),
  });
};
