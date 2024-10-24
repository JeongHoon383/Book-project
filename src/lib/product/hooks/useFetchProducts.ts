import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../api";
import { PRODUCT_PAGE_SIZE } from "@/constants";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { PaginatedProductsDTO } from "../types";

export const useFetchProducts = () => {
  return useInfiniteQuery<PaginatedProductsDTO>({
    queryKey: ["products"],
    queryFn: async ({ pageParam }) => {
      console.log("Fetching page:", {
        pageParam: pageParam ? "exists" : "null",
        pageSize: PRODUCT_PAGE_SIZE,
      });

      return await fetchAllProducts(
        PRODUCT_PAGE_SIZE,
        pageParam as QueryDocumentSnapshot<DocumentData> | null
      );
    },
    getNextPageParam: (lastPage) => {
      // lastPage.products가 비어있거나 hasNextPage가 false면 undefined 반환
      if (!lastPage.products.length || !lastPage.hasNextPage) {
        return undefined;
      }
      return lastPage.lastVisible;
    },
    initialPageParam: null,
  });
};
