import { useCartStore } from "@/store/cart/useCartStore";

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

  return (
    <button
      onClick={isInCart ? onClickView : onClickAdd}
      className="w-full py-2 bg-blue-500 text-white text-sm md:text-base rounded-lg"
    >
      {isInCart ? "장바구니 보기" : "장바구니"}
    </button>
  );
};
