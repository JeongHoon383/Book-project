import React from "react";
// import { pageRoutes } from "@/apiRoutes";
// import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

interface OrderItem {
  id: string;
  image: string;
  title: string;
  quantity: number;
  price: number;
}

interface OrderItemsProps {
  items: OrderItem[];
}

export const OrderItems: React.FC<OrderItemsProps> = () => {
  // const navigate = useNavigate()

  // const handleNavigate = () => {
  //   navigate(`${pageRoutes.productDetail}/${id}`);
  // };

  // 사진, 제목 눌렀을 때 해당 상품 상세페이지로 이동

  return (
    <div className="border border-borderGray rounded-xl shadow-sm">
      {/* 헤더 */}
      <div className="flex items-center p-4 md:p-8 justify-between border-b border-borderGray">
        <div className="flex items-center">
          <ShoppingCart className="mr-2 h-6 w-6" />
          <div className="text-lg md:text-2xl font-bold">주문 상품</div>
        </div>
        <div>
          <span>총</span>
          <span className="text-base md:text-xl font-bold px-1 text-[#474C98]">
            6
          </span>
          <span>개</span>
        </div>
      </div>

      {/* 상품 목록 테이블 */}
      <table className="w-full">
        <tbody>
          {/* 추가 상품들 */}
          <tr className="border-b border-dotted border-borderGray">
            <td className="p-4 md:p-10">
              <div className="flex items-center gap-4 md:gap-10">
                <img
                  src="/public/파친코.jpeg"
                  className="hidden md:block w-[82px] h-[122px]"
                />
                {/* 화면이 줄어들었을 때는 100px, 화면이 커졌을 때는 w-full로 되게 */}
                <div className="text-sm max-w-[80px] md:max-w-full md:text-lg font-semibold truncate overflow-hidden">
                  정훈정훈정훈정훈정훈정훈정훈정훈정훈정훈정훈정훈정훈정훈정훈정훈정훈정훈정훈정훈
                </div>
              </div>
            </td>
            <td className="w-2/5 p-4 min-w-[30px] md:p-10 text-right text-sm md:text-lg">
              2개
            </td>
            <td className="w-1/5 p-4 md:p-10 text-right">
              <div className="min-w-[60px] font-bold text-sm md:text-lg">
                43,200원
              </div>
              <div className="text-gray-400 line-through mr-1 hidden md:block">
                48,000원
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
