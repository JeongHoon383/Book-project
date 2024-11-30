import { useQuery } from "@tanstack/react-query";
import { fetchAllProductsAPI } from "../api";
import { PRODUCT_KEY } from "../key";

export const useFetchAllProducts = () => {
  return useQuery({
    queryKey: [PRODUCT_KEY],
    queryFn: fetchAllProductsAPI,
  });
};
