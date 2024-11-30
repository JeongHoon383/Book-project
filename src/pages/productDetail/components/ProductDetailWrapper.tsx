import { useNavigate, useParams } from "react-router-dom";
import { BookMain } from "./BookMain";
import { RecommendedBooks } from "./RecommendedBooks";
import { CartModal } from "@/pages/common/components/CartModal";
import { useFetchAllProducts } from "@/lib/product/hooks/useFetchAllProducts";
import { useModal } from "@/hooks/useModal";
import { useAddToCart } from "@/hooks/useAddToCart";
import { pageRoutes } from "@/apiRoutes";
import { CartItem } from "@/store/cart/types";
import { useOrderStore } from "@/store/order/useOrderStore";
import { LoadingPage } from "@/pages/loading/components/LoadingPage";
import { usePageTitle } from "@/hooks/usePageTitle";

export const ProductDetailWrapper = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const setOrder = useOrderStore((state) => state.setOrder);
  const { data, isLoading } = useFetchAllProducts();
  const {
    isOpen: isCartModalOpen,
    openModal: openCartModal,
    closeModal: closeCartModal,
  } = useModal();

  const selectProduct = () => {
    return data?.find((item) => item.id === id);
  };

  const selectedProduct = selectProduct();

  const recommendProduct = () => {
    return (
      data?.filter(
        (item) => item.category.name === selectedProduct?.category.name
      ) || []
    );
  };

  const recommendedProduct = recommendProduct();

  const handleCartAction = useAddToCart();

  const handleOrderAction = () => {
    if (selectedProduct) {
      const directItem: CartItem = {
        id: selectedProduct.id,
        sellerId: selectedProduct.sellerId,
        image: {
          original: selectedProduct.image.original,
          webp: selectedProduct.image.webp,
        },
        title: selectedProduct.title,
        price: selectedProduct.price,
        count: 1,
        stock: selectedProduct.stock,
        author: selectedProduct.author,
      };
      setOrder(directItem);
      navigate(pageRoutes.purchase);
    }
  };

  usePageTitle(selectedProduct?.title, "경향문고");

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col">
      <BookMain
        product={selectedProduct!}
        onClickAddCartButton={(e: React.MouseEvent) => {
          e.stopPropagation();
          handleCartAction(selectedProduct!);
        }}
        onClickAddOrderButton={handleOrderAction}
        onClickViewCart={openCartModal}
      />
      <RecommendedBooks books={recommendedProduct} />
      <CartModal
        isModalOpened={isCartModalOpen}
        handleClickDisagree={closeCartModal}
      />
    </div>
  );
};
