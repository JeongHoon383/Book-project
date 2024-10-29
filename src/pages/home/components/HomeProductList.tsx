import { useFetchProducts } from "@/lib/product/hooks/useFetchProduct";
import { HomeProductItem } from "./HomeProductItem";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRODUCT_PAGE_SIZE } from "@/constants";
import { useInfiniteScroll } from "@/lib/product/hooks/useInfiniteScroll";
import { LoadingSpinner } from "@/pages/common/components/LoadingSpinner";

interface HomeProductListProps {
  pageSize?: number;
}

export const HomeProductList: React.FC<HomeProductListProps> = ({
  pageSize = PRODUCT_PAGE_SIZE,
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFetchProducts({ pageSize });
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("latest");

  const products = data ? data.pages.flatMap((page) => page.products) : [];

  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  if (isLoading) {
    return <LoadingSpinner size={50} color="#007aff" />; // 초기 로딩 시 스피너 표시
  }

  // 전체 선택 체크박스 클릭 시 호출
  const handleSelectAll = () => {
    if (!products) return [];
    if (isAllSelected) {
      setSelectedProductIds([]); // 전체 해제 시, 선택 목록 초기화
    } else {
      setSelectedProductIds(products.map((product) => product.id)); // 전체 선택시, 모든 상품의 ID 추가
    }
    setIsAllSelected(!isAllSelected); // 전체 선택 상태 반전
  };

  // 개별 상품 선택/해제 핸들링 함수
  const toggleSelectProduct = (id: string) => {
    setSelectedProductIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };

  // 상품 목록 정렬 함수
  const sortedProducts = () => {
    if (!products) return [];
    switch (sortOption) {
      case "latest":
        return [...products].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
      case "priceLow":
        return [...products].sort((a, b) => a.price - b.price);
      case "priceHigh":
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  const sortedProductList = sortedProducts();

  return (
    <div>
      <div className="flex justify-between items-center border-b border-borderGray pb-5">
        <div>페이지네이션</div>
        <div className="flex gap-10 items-center">
          <div className="flex gap-2">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAll}
            />
            <span>전체선택</span>
          </div>
          <div>찜하기</div>
          <div>장바구니</div>
          <div>
            <Select onValueChange={(value) => setSortOption(value)}>
              <SelectTrigger>
                <SelectValue placeholder="정렬 기준 선택" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="latest">최신순</SelectItem>
                <SelectItem value="priceLow">가격 낮은 순</SelectItem>
                <SelectItem value="priceHigh">가격 높은 순</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div>
        {sortedProductList.map((product, index) => (
          <HomeProductItem
            product={product}
            key={product.id}
            onToggleSelect={() => toggleSelectProduct(product.id)}
            isSelected={selectedProductIds.includes(product.id)}
            ref={index === sortedProductList.length - 1 ? ref : undefined} // 마지막 요소에 ref 할당
          />
        ))}
      </div>
      {isFetchingNextPage && (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <LoadingSpinner size={30} color="#36d7b7" />{" "}
          {/* 무한 스크롤 로딩 스피너 */}
        </div>
      )}
    </div>
  );
};
