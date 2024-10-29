// import { useFetchAllProducts } from "@/lib/product/hooks/useFetchAllProducts";

interface CartModalProps {
  isModalOpened: boolean;
  handleClickDisagree: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isModalOpened,
  handleClickDisagree,
}) => {
  // const { data } = useFetchAllProducts(); // 전체 도서 목록 가져오기

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
            <div className="border-b border-borderGray">캐러셀</div>
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
