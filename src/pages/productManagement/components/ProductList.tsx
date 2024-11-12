import { ProductManageList } from "./ProductManageList";
import { useModal } from "@/hooks/useModal";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { lazy, Suspense, useState } from "react";
import { useFetchProducts } from "@/lib/product/hooks/useFetchProduct";
import { useDeleteProduct } from "@/lib/product/hooks/useDeleteProduct";
import { useProductStore } from "@/store/product/useProductStore";
import { PRODUCT_PAGE_SIZE } from "@/constants";
import { useInfiniteScroll } from "@/lib/product/hooks/useInfiniteScroll";
import { LoadingSpinner } from "@/pages/common/components/LoadingSpinner";
import { useFilterStore } from "@/store/filter/useFilterStore";
import CustomSelect from "@/pages/common/components/CustomSelect";
import { Button } from "@/pages/common/components/Button";

const ProductRegistrationModal = lazy(() =>
  import("./ProductRegistrationModal").then((module) => ({
    default: module.ProductRegistrationModal,
  }))
);

interface ProductListProps {
  pageSize?: number;
}

export const ProductList: React.FC<ProductListProps> = ({
  pageSize = PRODUCT_PAGE_SIZE,
}) => {
  const deleteMutation = useDeleteProduct();
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("latest");
  const { isOpen, openModal, closeModal } = useModal();
  const { user } = useAuthStore();
  const { searchTerm } = useFilterStore();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFetchProducts({ pageSize, searchTerm });
  const { setEditableProduct } = useProductStore();

  const products = data ? data.pages.flatMap((page) => page.products) : [];
  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }); //

  if (isLoading) {
    return <LoadingSpinner size={50} color="#007aff" centered={true} />; // 초기 로딩 시 스피너 표시
  }

  // 상품 목록 정렬 함수
  const sortedProducts = () => {
    if (!products) return [];
    switch (sortOption) {
      case "latest":
        return [...products].sort((a, b) => {
          // undefined 처리: createdAt이 undefined인 경우 null 날짜를 대체하도록 처리
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA; // 최신순으로 정렬
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

  // 개별 상품 선택, 삭제 기능
  const handleDelete = () => {
    if (selectedProductIds.length === 0) {
      alert(); // 삭제 알림창 수정 필요
      return;
    }
    if (window.confirm("선택한 항목을 삭제하시겠습니까?")) {
      selectedProductIds.forEach((id) => deleteMutation.mutate(id));
      setSelectedProductIds([]); // 삭제 후 선택 초기화
    } // 삭제 알림창 수정 필요
  };

  // 개별 상품 선택, 수정 기능
  const handleEdit = () => {
    if (selectedProductIds.length !== 1) {
      alert("하나의 상품만 선택해 주세요.");
      return;
    }
    const selectedProduct = products?.find(
      (product) => product.id === selectedProductIds[0]
    );
    if (selectedProduct) {
      setEditableProduct(selectedProduct);
      openModal();
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center border-b border-borderGray pb-5">
          <div className="flex items-center gap-2 md:gap-4 font-bold text-sm md:text-base">
            <div>전체 {products.length}</div>
            <div>판매중 1</div>
            <div>판매완료 1</div>
          </div>
          <div>
            {user?.isSeller && <Button text="상품 등록" onClick={openModal} />}
          </div>
        </div>
        <div className="flex gap-2 justify-center md:justify-end items-center py-5">
          <CustomSelect setSortOption={setSortOption} />
          <Button text="수정" onClick={handleEdit} />
          <Button text="삭제" onClick={handleDelete} />
        </div>
        {/* 여기부터 시작 */}
        <div className="container mx-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-gray-700 border-b border-borderGray text-sm md:text-lg">
                <th className="p-2 text-center w-8">
                  <input
                    type="checkbox"
                    aria-label="전체 선택"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="p-2 text-left w-1/3">상품명</th>
                <th className="p-2 text-center">판매가</th>
                <th className="p-2 text-center hidden md:table-cell">
                  카테고리
                </th>
                <th className="p-2 text-center">상태</th>
                <th className="p-2 text-center hidden md:table-cell">재고</th>
                <th className="p-2 text-center hidden md:table-cell">등록일</th>
                <th className="p-2 text-center hidden md:table-cell">수정일</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                sortedProductList.map((product, index) => (
                  <ProductManageList
                    key={`${product.id}_${index}`}
                    product={product}
                    onToggleSelect={() => toggleSelectProduct(product.id)}
                    isSelected={selectedProductIds.includes(product.id)}
                    ref={
                      index === sortedProductList.length - 1 ? ref : undefined
                    }
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {isOpen && (
          <ProductRegistrationModal
            isOpen={isOpen}
            onClose={() => {
              closeModal();
            }}
            sellerId={user!.id}
          />
        )}
      </Suspense>
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
