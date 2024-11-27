import { useNavigate, useParams } from "react-router-dom";
import { BookMain } from "./BookMain";
import { RecommendedBooks } from "./RecommendedBooks";
import { CartModal } from "@/pages/common/components/CartModal";
import { useFetchProductById } from "@/lib/product/hooks/useFetchProductById";
import { useFetchAllProducts } from "@/lib/product/hooks/useFetchAllProducts";
import { useModal } from "@/hooks/useModal";
import { useAddToCart } from "@/hooks/useAddToCart";
import { pageRoutes } from "@/apiRoutes";
import { CartItem } from "@/store/cart/types";
import { useOrderStore } from "@/store/order/useOrderStore";

export const ProductDetailWrapper = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // URL 파라미터에서 ID 가져오기
  const { data: product, isLoading: isProductLoading } = useFetchProductById(
    id!
  );
  const setOrder = useOrderStore((state) => state.setOrder);
  const { data: allProducts, isLoading: isAllProductsLoading } =
    useFetchAllProducts();
  const {
    isOpen: isCartModalOpen,
    openModal: openCartModal,
    closeModal: closeCartModal,
  } = useModal();

  const handleCartAction = useAddToCart();

  const handleOrderAction = () => {
    if (product) {
      const directItem: CartItem = {
        ...product,
        count: 1,
      };
      setOrder(directItem); // product가 있을 때만 호출
      navigate(pageRoutes.purchase);
    }
  };

  const filteredBooks = allProducts?.filter(
    (books) =>
      books.category.name === product?.category.name && books.id !== product.id
  );

  if (isProductLoading || isAllProductsLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="flex flex-col">
      {product ? (
        <BookMain
          product={product}
          onClickAddCartButton={(e: React.MouseEvent) => {
            e.stopPropagation();
            handleCartAction(product);
          }}
          onClickAddOrderButton={handleOrderAction}
          onClickViewCart={openCartModal}
        />
      ) : (
        <div>Loading...</div>
      )}
      {filteredBooks ? (
        <RecommendedBooks books={filteredBooks} />
      ) : (
        <div>Loading...</div>
      )}
      <CartModal
        isModalOpened={isCartModalOpen}
        handleClickDisagree={closeCartModal}
      />
    </div>
  );
};
