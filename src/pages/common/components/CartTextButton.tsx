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

  // 장바구니 보기는 됨
  // 장바구니에 추가가 되면 안됨
  // 장바구니 보기를 눌렀을 때 장바구니 모달이 나와야됨

  return (
    <button
      onClick={isInCart ? onClickView : onClickAdd}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {isInCart ? "장바구니 보기" : "장바구니"}
    </button>
  );
};
