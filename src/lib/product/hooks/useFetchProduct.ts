import { useQuery } from "@tanstack/react-query";
import { PRODUCT_KEY } from "../key";
import { fetchProducts } from "../api";

export const useFetchProducts = () => {
  return useQuery({
    queryKey: [PRODUCT_KEY],
    queryFn: fetchProducts,
  });
};
