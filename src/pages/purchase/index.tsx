// 장바구니에 담았을 때 우선적으로 재고 감소
// 판매자가 등록한 상품의 재고 먼저 확인

import { useCartStore } from "@/store/cart/useCartStore";
import { OrderItems } from "./components/OrderItems";
import { PaymentInfo } from "./components/PaymentInfo";
import { ShippingInfo } from "./components/ShippingInfo";
import { LoadingSpinner } from "../common/components/LoadingSpinner";

// OrderItem 타입 정의
interface OrderItem {
  id: string;
  image: string;
  title: string;
  quantity: number;
  price: number;
}

export const Purchase = () => {
  const cartProduct = useCartStore((state) => state.cart);

  if (!cartProduct) {
    return <LoadingSpinner size={50} color="#007aff" centered={true} />;
  }

  // CartItem[]을 OrderItem[] 형식으로 변환
  const orderItems: OrderItem[] = cartProduct.map((item) => ({
    id: item.id,
    image: item.image,
    title: item.title,
    quantity: item.count, // count를 quantity로 매핑
    price: item.price,
  }));

  return (
    <div className="flex flex-col gap-5">
      <p className="text-3xl font-bold">주문/결제</p>
      <ShippingInfo />
      <OrderItems items={orderItems} />
      <PaymentInfo />
      <div className="flex justify-end mb-10">
        <button className="px-12 py-3 rounded bg-[#5055B1] text-white font-medium hover:bg-[#2C307B]">
          결제하기
        </button>
      </div>
    </div>
  );
};
