import { useFetchAllProducts } from "@/lib/product/hooks/useFetchAllProducts";
import { useCartStore } from "@/store/cart/useCartStore";
import { useToastStore } from "@/store/toast/useToastStore";

interface CartTextButtonProps {
  onClickAdd: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickView: () => void;
  id: string;
}

export const CartTextButton: React.FC<CartTextButtonProps> = ({
  onClickAdd,
  onClickView,
  id,
}) => {
  const cart = useCartStore((state) => state.cart);
  const isInCart = cart.some((item) => item.id === id);
  const { data: products } = useFetchAllProducts();
  const { addToast } = useToastStore();

  const handleCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedProduct = products?.find((product) => product.id === id);

    if (selectedProduct?.stock === 0) {
      addToast("현재 품절된 상품입니다. 곧 재입고될 예정입니다", "error");
      return;
    }

    if (isInCart) {
      onClickView();
    } else {
      onClickAdd(e);
    }
  };

  return (
    <button
      onClick={handleCartClick}
      className="w-full py-2 bg-blue-500 text-white text-sm md:text-base rounded-lg"
    >
      {isInCart ? "장바구니 보기" : "장바구니"}
    </button>
  );
};
