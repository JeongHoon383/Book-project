import { useQuery } from "@tanstack/react-query";
import { PURCHASE_KEY } from "../key";
import { fetchPurchaseAPI } from "../api";

export const useFetchPurchase = () => {
  return useQuery({
    queryKey: [PURCHASE_KEY],
    queryFn: fetchPurchaseAPI,
  });
};
