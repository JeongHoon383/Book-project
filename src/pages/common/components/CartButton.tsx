import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export const CartButton = ({ onClick }: { onClick: () => void }) => {
  const cartItemCount = 1;

  // cart hover시 장바구니 컴포넌트 나오게

  return (
    <Button variant="ghost" className="relative" onClick={onClick}>
      <ShoppingCart className="h-5 w-5" />
      {cartItemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cartItemCount}
        </span>
      )}
    </Button>
  );
};
