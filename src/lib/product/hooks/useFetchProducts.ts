import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../api";

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });
};
