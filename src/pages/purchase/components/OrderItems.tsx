import React from "react";
import { ShoppingCart } from "lucide-react";
import { CartItem } from "@/store/cart/types";

export interface OrderItemsProps {
  product: CartItem | CartItem[] | null;
  totalCount: number;
  isDirectPurchase: boolean;
}

export const OrderItems: React.FC<OrderItemsProps> = ({
  product,
  totalCount,
  isDirectPurchase,
}) => {
  // product가 단일 CartItem인 경우 배열로 변환하여 처리
  const productList = Array.isArray(product)
    ? product
    : product
    ? [product]
    : [];

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
            {isDirectPurchase && product && !Array.isArray(product)
              ? product.count
              : totalCount}
          </span>
          <span>개</span>
        </div>
      </div>

      {/* 상품 목록 테이블 */}
      <table className="w-full">
        <tbody>
          {/* 추가 상품들 */}
          {productList.map(({ id, title, image, count, price }) => (
            <tr key={id} className="border-b border-dotted border-borderGray">
              <td className="p-4 md:p-10">
                <div className="flex items-center gap-4 md:gap-10">
                  <img
                    src={image}
                    className="hidden md:block w-[82px] h-[122px]"
                  />
                  {/* 화면이 줄어들었을 때는 100px, 화면이 커졌을 때는 w-full로 되게 */}
                  <div className="text-sm max-w-[80px] md:max-w-full md:text-lg font-semibold truncate overflow-hidden">
                    {title}
                  </div>
                </div>
              </td>
              <td className="w-2/5 p-4 min-w-[30px] md:p-10 text-right text-sm md:text-lg">
                {count}개
              </td>
              <td className="w-1/5 p-4 md:p-10 text-right">
                <div className="min-w-[60px] font-bold text-sm md:text-lg">
                  {price.toLocaleString()}원
                </div>
                <div className="text-gray-400 line-through mr-1 hidden md:block">
                  {Math.round(price * 1.1).toLocaleString()}원
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
