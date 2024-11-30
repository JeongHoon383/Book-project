import { CartItem } from "@/store/cart/types";
import { ShoppingCart } from "lucide-react";

interface CartButtonProps {
  onClick: () => void;
  cart: CartItem[];
}

export const CartButton: React.FC<CartButtonProps> = ({ onClick, cart }) => {
  const cartItemCount = cart.length;

  return (
    <button className="relative" onClick={onClick}>
      <ShoppingCart className="w-4 h-4" />
      {cartItemCount > 0 && (
        <span className="absolute -top-2 -right-5 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
          {cartItemCount}
        </span>
      )}
    </button>
  );
};
