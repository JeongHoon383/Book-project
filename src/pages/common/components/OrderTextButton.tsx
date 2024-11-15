import { useFetchAllProducts } from "@/lib/product/hooks/useFetchAllProducts";
import { useToastStore } from "@/store/toast/useToastStore";

interface OrderTextButtonProps {
  onClick: () => void;
  id: string;
}

export const OrderTextButton: React.FC<OrderTextButtonProps> = ({
  onClick,
  id,
}) => {
  const { data: products } = useFetchAllProducts();
  const { addToast } = useToastStore();

  const handleOrderClick = () => {
    const selectedProduct = products?.find((product) => product.id === id);

    if (selectedProduct?.stock === 0) {
      addToast("현재 품절된 상품입니다. 곧 재입고될 예정입니다", "error");
      return;
    }

    onClick();
  };

  return (
    <button
      onClick={handleOrderClick}
      className="text-sm md:text-base py-2 w-full bg-green-500 text-white rounded-lg"
    >
      바로구매
    </button>
  );
};
