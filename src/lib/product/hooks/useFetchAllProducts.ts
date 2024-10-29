import { useQuery } from "@tanstack/react-query";
import { fetchAllProductsAPI } from "../api"; // 전체 도서 목록을 가져오는 API
import { PRODUCT_KEY } from "../key";

export const useFetchAllProducts = () => {
  return useQuery({
    queryKey: [PRODUCT_KEY],
    queryFn: fetchAllProductsAPI,
  });
};
