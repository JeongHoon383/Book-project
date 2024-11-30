import { useEffect, useState } from "react";
import { Carousel } from "./Carousel";
import { Trash2, X } from "lucide-react";
import { useCartStore } from "@/store/cart/useCartStore";
import { convertCartItemToIProduct } from "@/utils/convertToCarouselType";
import { useFetchAllProducts } from "@/lib/product/hooks/useFetchAllProducts";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import { useToastStore } from "@/store/toast/useToastStore";
import { useOrderStore } from "@/store/order/useOrderStore";

interface CartModalProps {
  isModalOpened: boolean;
  handleClickDisagree: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isModalOpened,
  handleClickDisagree,
}) => {
  const navigate = useNavigate();
  const { data } = useFetchAllProducts();
  const user = useAuthStore((state) => state.user);
  const setOrder = useOrderStore((state) => state.setOrder);

  const {
    cart,
    totalPrice,
    totalCount,
    increaseItemCount,
    decreaseItemCount,
    removeCartItem,
  } = useCartStore();
  const { addToast } = useToastStore();

  const handleNavigate = (id: string) => {
    navigate(`${pageRoutes.productDetail}/${id}`);
    handleClickDisagree();
  };

  const [shippingFee, setShippingFee] = useState(3000);

  const handleIncrease = (id: string) => {
    const productInCart = cart.find((item) => item.id === id);

    if (productInCart) {
      if (productInCart.stock === 0) {
        addToast("재고가 부족합니다.", "error");
        return;
      }
      increaseItemCount(id, user!.id);
    }
  };

  const handleDecrease = (id: string) => {
    decreaseItemCount(id, user!.id);
  };

  const handleClickDeleteItem = (id: string) => {
    removeCartItem(id, user!.id);
  };

  const handleClickOrder = () => {
    setOrder(cart);
    navigate(pageRoutes.purchase);
    handleClickDisagree();
  };

  useEffect(() => {
    if (totalPrice >= 50000) {
      setShippingFee(0);
    } else {
      setShippingFee(3000);
    }
  }, [totalPrice]);

  const carouselItems = data ? convertCartItemToIProduct(cart, data) : [];

  return (
    <>
      {isModalOpened && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleClickDisagree}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-50 transition-transform duration-300 transform ${
          isModalOpened ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button onClick={handleClickDisagree} className="p-4">
          <X />
        </button>
        <div className="p-4 h-full flex flex-col">
          <h2 className="text-xl font-bold mb-4">장바구니</h2>
          <div className="flex-1 overflow-y-auto">
            <Carousel
              items={carouselItems}
              itemsPerPage={2}
              direction="column"
              renderItem={(item) => (
                <div className="w-full h-full grid grid-cols-[1fr_1fr] justify-center">
                  <picture>
                    <source srcSet={item.image.webp} type="image/webp" />
                    <source srcSet={item.image.original} type="image/jpeg" />
                    <img
                      src={item.image.webp}
                      className="w-[200px] h-[200px] object-contain cursor-pointer"
                      onClick={() => handleNavigate(item.id)}
                    />
                  </picture>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-5">
                      <div
                        className="font-bold text-xl overflow-hidden text-ellipsis whitespace-normal line-clamp-1 cursor-pointer hover:underline"
                        onClick={() => handleNavigate(item.id)}
                      >
                        {item.title}
                      </div>
                      <div className="text-info overflow-hidden text-ellipsis whitespace-normal line-clamp-1">
                        {item.author}
                      </div>
                      <div className="font-bold">
                        {item.price.toLocaleString()}원
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleDecrease(item.id)}
                          className="px-2 py-1 bg-gray-200 rounded-lg"
                        >
                          -
                        </button>
                        <span>
                          {
                            cart.find((cartItem) => cartItem.id === item.id)
                              ?.count
                          }
                        </span>
                        <button
                          onClick={() => handleIncrease(item.id)}
                          className="px-2 py-1 bg-gray-200 rounded-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <button onClick={() => handleClickDeleteItem(item.id)}>
                        <Trash2 size={16} />
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
                <div className="flex justify-between text-xl font-bold">
                  <div>합계</div>
                  <div>{(totalPrice + shippingFee).toLocaleString()}원</div>
                </div>
                <button
                  onClick={handleClickOrder}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition-colors duration-300"
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
