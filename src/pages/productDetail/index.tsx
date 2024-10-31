import { useParams } from "react-router-dom";
import { BookMain } from "./components/BookMain";
import { RecommendedBooks } from "./components/RecommendedBooks";
import { useFetchProductById } from "@/lib/product/hooks/useFetchProductById";
import { useFetchAllProducts } from "@/lib/product/hooks/useFetchAllProducts";
import { useModal } from "@/hooks/useModal";
import { useAddToCart } from "@/hooks/useAddToCart";
import { CartModal } from "../common/components/CartModal";

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>(); // URL 파라미터에서 ID 가져오기
  const { data: product, isLoading: isProductLoading } = useFetchProductById(
    id!
  );
  const { data: allProducts, isLoading: isAllProductsLoading } =
    useFetchAllProducts();
  const {
    isOpen: isCartModalOpen,
    openModal: openCartModal,
    closeModal: closeCartModal,
  } = useModal();

  const handleCartAction = useAddToCart();

  const filteredBooks = allProducts?.filter(
    (books) =>
      books.category.name === product?.category.name && books.id !== product.id
  );

  if (isProductLoading || isAllProductsLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen h-full">
      {product ? (
        <BookMain
          product={product}
          onClickAddCartButton={(e: React.MouseEvent) => {
            e.stopPropagation();
            handleCartAction(product);
          }}
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
