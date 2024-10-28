// hooks/useInfiniteScroll.ts
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollOptions {
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

export const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: InfiniteScrollOptions) => {
  const { ref, inView } = useInView({
    threshold: 0.1, // 요소가 10% 보일 때 콜백 실행
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { ref };
};

// 동작원리 이해해야됨
