import { useInfiniteQuery } from "@tanstack/react-query";
import { PRODUCT_KEY } from "../key";
import { fetchProductsAPI } from "../api";
import { PaginatedProductsDTO } from "../types"; // PaginatedProductsDTO를 포함
import { PRODUCT_PAGE_SIZE } from "@/constants";
import { useFilterStore } from "@/store/filter/useFilterStore";

interface UseProductsQueryOptions {
  pageSize?: number;
}

export const useFetchProducts = ({
  pageSize = PRODUCT_PAGE_SIZE,
}: UseProductsQueryOptions) => {
  const { categoryId } = useFilterStore();
  const filter = { categoryId };
  const queryKey = [PRODUCT_KEY, filter] as const;

  return useInfiniteQuery<PaginatedProductsDTO, Error>({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      fetchProductsAPI(filter, pageSize, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
