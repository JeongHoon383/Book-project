import { useQueryClient } from "@tanstack/react-query";
import { fetchProductByIdAPI } from "../api";
import { PRODUCT_KEY } from "../key";

export const usePrefetchProduct = () => {
  const queryClient = useQueryClient();

  const prefetchProductData = (productId: string) => {
    queryClient.prefetchQuery({
      queryKey: [PRODUCT_KEY, productId],
      queryFn: () => fetchProductByIdAPI(productId),
    });
  };

  return prefetchProductData;
};
