import { useEffect, useState } from "react";
import { Carousel } from "./Carousel";
import { LoadingSpinner } from "./LoadingSpinner";
import { Trash2 } from "lucide-react"; // Trash 아이콘 추가
import { useCartStore } from "@/store/cart/useCartStore";
import { convertCartItemToIProduct } from "@/utils/convertToCarouselType";
import { useFetchAllProducts } from "@/lib/product/hooks/useFetchAllProducts";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import { useToastStore } from "@/store/toast/useToastStore";
import { useOrderStore } from "@/store/order/useOrderStore";

// 수량 데이터가 다른 페이지로 이동할 때 저장되지 않음

// 수량 데이터가 다른 페이지로 이동할 때 저장되지 않음

interface CartModalProps {
  isModalOpened: boolean;
  handleClickDisagree: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isModalOpened,
  handleClickDisagree,
}) => {
  const navigate = useNavigate();
  const { data, isLoading } = useFetchAllProducts();
  const user = useAuthStore((state) => state.user);
  const cartProduct = useCartStore((state) => state.cart);
  const setCartOrder = useOrderStore((state) => state.setCartOrder);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const totalCount = useCartStore((state) => state.totalCount);
  const increaseItemCount = useCartStore((state) => state.increaseItemCount);
  const decreaseItemCount = useCartStore((state) => state.decreaseItemCount);
  const removeCartItem = useCartStore((state) => state.removeCartItem);
  const { addToast } = useToastStore();

  const [shippingFee, setShippingFee] = useState(3000); // 기본 배송비 설정

  const handleIncrease = (id: string) => {
    const productInCart = cartProduct.find((item) => item.id === id);

    if (productInCart) {
      if (productInCart.stock === 0) {
        addToast("재고가 부족합니다.", "error");
        return;
      }
      increaseItemCount(id, user!.id);
    }
  };

  const handleDecrease = (id: string) => {
    decreaseItemCount(id, user!.id); // store의 수량 감소 함수 호출
  };

  const handleClickDeleteItem = (id: string) => {
    removeCartItem(id, user!.id);
  };

  const handleClickOrder = () => {
    setCartOrder(cartProduct);
    navigate(pageRoutes.purchase);
    handleClickDisagree();
  };

  // 배송비 조건 적용
  useEffect(() => {
    if (totalPrice >= 50000) {
      setShippingFee(0); // 50,000원 이상이면 무료 배송
    } else {
      setShippingFee(3000); // 50,000원 미만이면 3,000원 부과
    }
  }, [totalPrice]);

  if (isLoading || !data) {
    return <LoadingSpinner size={50} color="#007aff" centered={true} />;
  }

  const carouselItems = data
    ? convertCartItemToIProduct(cartProduct, data)
    : [];

  return (
    <>
      {isModalOpened && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleClickDisagree}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-50 transition-transform transform ${
          isModalOpened ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button onClick={handleClickDisagree} className="p-4">
          닫기
        </button>
        <div className="p-4 h-full flex flex-col">
          <h2 className="text-xl font-bold mb-4">장바구니</h2>
          <div className="flex-1 overflow-y-auto">
            <Carousel
              items={carouselItems}
              itemsPerPage={2}
              direction="column" // 세로 배치 설정
              renderItem={(item) => (
                <div className="w-full h-full grid grid-cols-[1fr_1fr] justify-center">
                  <img
                    className="w-[200px] h-[200px] object-contain"
                    src={item.image}
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-5">
                      <div>{item.title}</div>
                      <div>{item.author}</div>
                      <div>{item.price.toLocaleString()}원</div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleDecrease(item.id)}
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          -
                        </button>
                        <span>
                          {
                            cartProduct.find(
                              (cartItem) => cartItem.id === item.id
                            )?.count
                          }
                        </span>
                        <button
                          onClick={() => handleIncrease(item.id)}
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      {/* 삭제 버튼 추가 */}
                      <button onClick={() => handleClickDeleteItem(item.id)}>
                        <Trash2 size={16} /> {/* Trash 아이콘 표시 */}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            />
            <div className="mb-10">
              <div className="border-b border-borderGray py-5 flex flex-col gap-5">
                <div className="flex justify-between">
                  <div>주문 가격</div>
                  <div>{totalPrice.toLocaleString()}원</div>
                </div>
                <div className="flex justify-between">
                  <div>배송비</div>
                  <div>{shippingFee.toLocaleString()}원</div>
                </div>
              </div>
              <div className="py-5 flex flex-col gap-10">
                <div className="flex justify-between">
                  <div>합계</div>
                  <div>{(totalPrice + shippingFee).toLocaleString()}원</div>
                </div>
                <button
                  onClick={handleClickOrder}
                  className="px-4 py-2 bg-black text-white rounded"
                >
                  주문하기 ({totalCount})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
