import { useFetchAllProducts } from "@/lib/product/hooks/useFetchAllProducts";
import { useEffect, useState } from "react";
import { Carousel } from "./Carousel";
import { LoadingSpinner } from "./LoadingSpinner";
import { Trash } from "lucide-react"; // Trash 아이콘 추가

interface CartModalProps {
  isModalOpened: boolean;
  handleClickDisagree: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isModalOpened,
  handleClickDisagree,
}) => {
  const { data, isLoading } = useFetchAllProducts(); // 전체 도서 목록 가져오기
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [orderPrice, setOrderPrice] = useState(0); // 주문 가격 상태 추가
  const [shippingFee, setShippingFee] = useState(3000); // 기본 배송비 설정
  const [totalPrice, setTotalPrice] = useState(0); // 총 가격 상태 추가

  useEffect(() => {
    if (data) {
      setQuantities(
        data.reduce((acc, item) => {
          acc[item.id] = 1;
          return acc;
        }, {} as { [key: string]: number })
      );
    }
  }, [data]);

  const handleIncrease = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const handleDecrease = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  // 주문 가격 및 배송비, 합계 계산 로직 추가
  useEffect(() => {
    if (data) {
      const newOrderPrice = data.reduce((acc, item) => {
        const itemQuantity = quantities[item.id] || 1;
        return acc + item.price * itemQuantity; // 각 아이템의 수량과 가격을 곱하여 총 주문 가격 계산
      }, 0);

      setOrderPrice(newOrderPrice); // 주문 가격 상태 업데이트

      // 배송비 조건 적용
      if (newOrderPrice >= 50000) {
        setShippingFee(0); // 50,000원 이상이면 무료 배송
      } else {
        setShippingFee(3000); // 50,000원 미만이면 3,000원 부과
      }

      setTotalPrice(newOrderPrice + (newOrderPrice >= 50000 ? 0 : 3000)); // 총 합계 계산
    }
  }, [data, quantities]); // data와 quantities가 변경될 때마다 재계산

  if (isLoading) {
    return <LoadingSpinner size={50} color="#007aff" />; // 초기 로딩 시 스피너 표시
  }

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
              items={data || []}
              itemsPerPage={2}
              direction="column" // 세로 배치 설정
              renderItem={(item) => (
                <div className="w-full h-full grid grid-cols-[1fr_1fr] justify-center gap-5">
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
                        <span>{quantities[item.id]}</span>
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
                      <button className="">
                        <Trash size={16} /> {/* Trash 아이콘 표시 */}
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
                  <div>{orderPrice.toLocaleString()}원</div>
                </div>
                <div className="flex justify-between">
                  <div>배송비</div>
                  <div>{shippingFee.toLocaleString()}원</div>
                </div>
              </div>
              <div className="py-5 flex flex-col gap-10">
                <div className="flex justify-between">
                  <div>합계</div>
                  <div>{totalPrice.toLocaleString()}원</div>
                </div>
                <button className="px-4 py-2 bg-black text-white rounded">
                  결제
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
