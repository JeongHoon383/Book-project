import React from "react";
import { ShoppingCart } from "lucide-react";
import { CartItem } from "@/store/cart/types";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";

export interface OrderItemsProps {
  product: CartItem[] | null;
}

export const OrderItems: React.FC<OrderItemsProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(`${pageRoutes.productDetail}/${id}`);
  };

  return (
    <div className="border border-borderGray rounded-xl shadow-sm">
      <div className="flex items-center p-4 justify-between border-b border-borderGray">
        <div className="flex gap-2 items-center">
          <ShoppingCart className="w-4 h-4" />
          <div className="text-base font-bold">주문 상품</div>
        </div>
        <div>
          <span>총</span>
          <span className="text-base font-bold px-1 text-[#474C98]">
            {product?.length}
          </span>
          <span>개</span>
        </div>
      </div>

      <table className="w-full">
        <tbody>
          {product?.map(({ id, title, image, count, price }) => (
            <tr
              key={id}
              className="text-xs border-b border-dotted border-borderGray last:border-0"
            >
              <td className="p-4">
                <div className="flex items-center gap-4">
                  <picture className="w-[80px] h-[120px] hidden md:block ">
                    <source srcSet={image.webp} type="image/webp" />
                    <source srcSet={image.original} type="image/jpeg" />
                    <img
                      src={image.original}
                      className="w-full h-full cursor-pointer"
                      onClick={() => handleNavigate(id)}
                    />
                  </picture>
                  <div
                    className="max-w-[80px] md:max-w-full text-sm font-semibold truncate overflow-hidden cursor-pointer hover:underline"
                    onClick={() => handleNavigate(id)}
                  >
                    {title}
                  </div>
                </div>
              </td>
              <td className="w-2/5 p-4 min-w-[30px] md:p-10 text-right">
                {count}개
              </td>
              <td className="w-1/5 p-4 md:p-10 text-right">
                <div className="min-w-[60px] font-bold text-sm">
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
