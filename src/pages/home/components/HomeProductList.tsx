import { useFetchProducts } from "@/lib/product/hooks/useFetchProduct";
import { HomeProductItem } from "./HomeProductItem";
import { useState } from "react";
import { PRODUCT_PAGE_SIZE } from "@/constants";
import { useInfiniteScroll } from "@/lib/product/hooks/useInfiniteScroll";
import { LoadingSpinner } from "@/pages/common/components/LoadingSpinner";
import { useModal } from "@/hooks/useModal";
import { CartModal } from "@/pages/common/components/CartModal";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import { useOrderStore } from "@/store/order/useOrderStore";
import { IProduct } from "@/lib/product/types";
import { CartItem } from "@/store/cart/types";
import { Heart, ShoppingCart } from "lucide-react";
import CustomSelect from "@/pages/common/components/CustomSelect";

interface HomeProductListProps {
  pageSize?: number;
}

export const HomeProductList: React.FC<HomeProductListProps> = ({
  pageSize = PRODUCT_PAGE_SIZE,
}) => {
  const navigate = useNavigate();
  const setOrder = useOrderStore((state) => state.setOrder);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFetchProducts({ pageSize });
  const {
    isOpen: isCartModalOpen,
    openModal: openCartModal,
    closeModal: closeCartModal,
  } = useModal();

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("latest");

  const products = data ? data.pages.flatMap((page) => page.products) : [];

  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

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

  const handleCartAction = useAddToCart();

  const handleAddSelectedToCart = () => {
    if (selectedProductIds.length === 0) return;

    const selectedProducts = products.filter((product) =>
      selectedProductIds.includes(product.id)
    );

    selectedProducts.forEach((product) => handleCartAction(product));

    setSelectedProductIds([]);
    setIsAllSelected(false);
  };

  const handleOrderAction = (product: IProduct) => {
    if (product) {
      const directItem: CartItem = {
        ...product,
        count: 1,
      };
      setOrder(directItem); // product가 있을 때만 호출
      navigate(pageRoutes.purchase);
    }
  };

  const sortedProductList = sortedProducts();

  if (isLoading) {
    return <LoadingSpinner size={50} color="#007aff" centered={true} />; // 초기 로딩 시 스피너 표시
  }

  // 모바일일때 글씨 제거, 아이콘만 나오게

  return (
    <div>
      <div className="text-sm md:text-base flex justify-end items-center border-b border-borderGray pb-5">
        <div className="flex gap-1 md:gap-2 items-center">
          <div className="flex gap-2 mr-4">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAll}
            />
            <span className="hidden md:block">전체선택</span>
          </div>
          <div className="p-2 border border-borderGray rounded-lg cursor-pointer">
            <Heart className="w-5 h-5" />
          </div>
          <div
            onClick={handleAddSelectedToCart}
            className="flex gap-2 py-2 px-2 md:px-4 font-bold cursor-pointer border border-borderGray rounded-lg"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden md:block">장바구니</span>
          </div>
          <div>
            <CustomSelect setSortOption={setSortOption} />
          </div>
        </div>
      </div>
      <div>
        {sortedProductList.map((product, index) => (
          <HomeProductItem
            product={product}
            key={`${product.id}_${index}`}
            onToggleSelect={() => toggleSelectProduct(product.id)}
            isSelected={selectedProductIds.includes(product.id)}
            ref={index === sortedProductList.length - 1 ? ref : undefined} // 마지막 요소에 ref 할당
            onClickAddCartButton={(e: React.MouseEvent) => {
              e.stopPropagation();
              handleCartAction(product);
            }}
            onClickAddOrderButton={() => handleOrderAction(product)}
            onClickViewCart={openCartModal} // 장바구니 보기 클릭 시 모달 열기
          />
        ))}
        <CartModal
          isModalOpened={isCartModalOpen}
          handleClickDisagree={closeCartModal}
        />
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
