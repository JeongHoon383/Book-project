import { Button } from "@/components/ui/button";
import { ProductManageList } from "./ProductManageList";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { lazy, Suspense, useEffect, useState } from "react";
import { useFetchProducts } from "@/lib/product/hooks/useFetchProducts";
import { useProductStore } from "@/store/product/useProductStore";
import { useDeleteProduct } from "@/lib/product/hooks/useDeleteProduct";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInView } from "react-intersection-observer";

const ProductRegistrationModal = lazy(() =>
  import("./ProductRegistrationModal").then((module) => ({
    default: module.ProductRegistrationModal,
  }))
);

export const ProductList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useFetchProducts();

  const setProducts = useProductStore((state) => state.setProducts);
  const products = useProductStore((state) => state.products);
  const setEditableProduct = useProductStore(
    (state) => state.setEditableProduct
  ); // Zustand 상태 설정 함수 가져오기

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false); // 전체 선택 상태 추가
  const [sortOption, setSortOption] = useState<string>("latest"); // 정렬 옵션 상태 추가
  const { isOpen, openModal, closeModal } = useModal();
  const { user } = useAuthStore();
  const deleteMutation = useDeleteProduct(); // 삭제 mutation 사용

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });
  // 데이터 업데이트
  useEffect(() => {
    if (data?.pages) {
      const allProducts = data.pages.flatMap((page) => page.products);
      setProducts(allProducts);
      console.log("Data updated:", {
        pagesCount: data.pages.length,
        productsCount: allProducts.length,
      });
    }
  }, [data?.pages, setProducts]);

  // 스크롤 감지 및 추가 데이터 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 상품 목록 정렬 함수
  const sortedProducts = () => {
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

  // 전체 선택 체크박스 클릭 시 호출
  const handleSelectAll = () => {
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
      alert("삭제할 항목을 선택해주세요."); // 삭제 알림창 수정 필요
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
      alert("하나의 상품만 선택해 주세요."); // 다중 선택 시 경고 메시지
      return;
    }
    const selectedProduct = products.find(
      (product) => product.id === selectedProductIds[0]
    );
    if (selectedProduct) {
      setEditableProduct(selectedProduct); // 선택된 상품 상태에 저장
      openModal(); // 모달 열기
    }
  };

  // 전체 선택 상태와 개별 선택 상태 동기화
  useEffect(() => {
    setIsAllSelected(selectedProductIds.length === products.length);
  }, [selectedProductIds, products]);

  // 페이지 로딩 시 최신순 정렬을 기본값으로 설정
  useEffect(() => {
    setSortOption("latest");
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching products.</div>;
  }

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center border-b border-borderGray pb-10">
          <div className="flex gap-32">
            <div>전체 {products.length}</div>
            <div>판매중 1</div>
            {/* {products.filter((p) => p.status === '판매중').length} */}
            <div>판매완료 1</div>
          </div>
          <div>
            {user?.isSeller && (
              <Button onClick={openModal}>
                <Plus className=" h-4 w-4" />
                상품 등록
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-end items-center p-5">
          <div className="flex gap-2">
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
            <Button variant="outline" onClick={handleEdit}>
              수정
            </Button>
            <Button variant="outline" onClick={handleDelete}>
              삭제
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center pb-5 border-b border-borderGray">
          <div className="flex items-center basis-5/12">
            <div className="w-10">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </div>
            <div>상품명</div>
          </div>
          <div className="flex justify-between basis-7/12">
            <div className="w-[10%] text-center">판매가</div>
            <div className="w-[15%] text-center">카테고리</div>
            <div className="w-[10%] text-center">상태</div>
            <div className="w-[5%] text-center">재고</div>
            <div className="w-[15%] text-center">등록일</div>
            <div className="w-[15%] text-center">수정일</div>
          </div>
        </div>
      </div>
      <div>
        {sortedProducts().map((product) => (
          <ProductManageList
            key={product.id}
            product={product}
            onToggleSelect={() => toggleSelectProduct(product.id)}
            isSelected={selectedProductIds.includes(product.id)}
          />
        ))}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {isOpen && (
          <ProductRegistrationModal
            isOpen={isOpen}
            onClose={() => {
              setEditableProduct(null); // 모달이 닫힐 때 상태 초기화
              closeModal();
            }}
            sellerId={user!.id}
          />
        )}
      </Suspense>
    </div>
  );
};
