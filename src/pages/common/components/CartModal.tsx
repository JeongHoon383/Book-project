import { useFetchAllProducts } from "@/lib/product/hooks/useFetchAllProducts";
import { useEffect, useState } from "react";
import { Carousel } from "./Carousel";
import { LoadingSpinner } from "./LoadingSpinner";

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

  const CustomPrevArrow = () => (
    <span className="text-lg p-2 bg-gray-200 rounded-full">&#9664;</span>
  );

  const CustomNextArrow = () => (
    <span className="text-lg p-2 bg-gray-200 rounded-full">&#9654;</span>
  );

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
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 transition-transform transform ${
          isModalOpened ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button onClick={handleClickDisagree} className="p-4">
          닫기
        </button>
        <div className="p-4 h-full">
          <h2 className="text-xl font-bold mb-4">장바구니</h2>
          <div className="h-full grid grid-rows-[1fr_1fr]">
            <Carousel
              items={data || []}
              itemsPerPage={2}
              renderItem={(item) => (
                <div className="grid grid-cols-[1fr_1fr] w-full gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.author}</p>
                      <p className="text-sm">{item.price.toLocaleString()}원</p>
                    </div>
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
                </div>
              )}
              showArrowsOnHover={false} // 화살표 항상 표시
              renderPrevArrow={CustomPrevArrow} // 커스텀 이전 화살표
              renderNextArrow={CustomNextArrow} // 커스텀 다음 화살표
            />
            <div>
              <div className="border-b border-borderGray py-5 flex flex-col gap-5">
                <div className="flex justify-between">
                  <div>주문 가격</div>
                  <div>₩10.000</div>
                </div>
                <div className="flex justify-between">
                  <div>배송비</div>
                  <div>₩3,000</div>
                </div>
              </div>
              <div className="py-5 flex flex-col gap-10">
                <div className="flex justify-between">
                  <div>합계</div>
                  <div>₩13,000</div>
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
