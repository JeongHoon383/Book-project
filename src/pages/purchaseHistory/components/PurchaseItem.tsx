import { pageRoutes } from "@/apiRoutes";
import { OrderItem } from "@/store/order/types";
import { useNavigate } from "react-router-dom";

interface PurchaseItem {
  data: OrderItem;
  onToggleSelect: () => void;
  isSelected: boolean;
}

export const PurchaseItem: React.FC<PurchaseItem> = ({
  data,
  onToggleSelect,
  isSelected,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(`${pageRoutes.productDetail}/${id}`);
  };

  return (
    <>
      {data.items.map((item) => (
        <tr
          key={item.productId}
          className="text-center text-xs border-b border-borderGray py-10"
        >
          <td className="p-2">
            <input
              type="checkbox"
              aria-label="개별 항목 선택"
              checked={isSelected}
              onChange={onToggleSelect}
            />
          </td>
          <td
            className="p-2 flex items-center md:space-x-4 text-left py-6"
            onClick={() => handleNavigate(item.productId)}
          >
            <picture className="w-24 h-24 hidden md:table-cell">
              <source srcSet={item.image.webp} type="image/webp" />
              <source srcSet={item.image.original} type="image/jpeg" />
              <img
                src={item.image.original}
                className="w-full h-full object-contain rounded cursor-pointer"
              />
            </picture>
            <span className="text-left md:max-w-[200px] max-w-[90px] truncate overflow-hidden whitespace-nowrap cursor-pointer hover:underline">
              {item.title}
            </span>
          </td>
          <td className="p-2 hidden md:table-cell">
            {item.price.toLocaleString()}원
          </td>
          <td className="p-2 hidden md:table-cell max-w-[100px] truncate overflow-hidden whitespace-nowrap">
            {item.sellerId}
          </td>
          {data.status === "주문 취소" ? (
            <td className="p-2 hidden md:table-cell text-red-500">
              {data.status}
            </td>
          ) : (
            <td className="p-2 hidden md:table-cell">{data.status}</td>
          )}
          <td className="p-2">{item.count}</td>
          <td className="p-2 hidden md:table-cell">
            {data.shippingFee.toLocaleString()}원
          </td>
          <td className="p-2">{data.totalPayment.toLocaleString()}원</td>
          <td className="p-2 hidden md:table-cell">
            {data.createdAt
              ? new Date(data.createdAt).toLocaleDateString().slice(0, -1)
              : "-"}
          </td>
        </tr>
      ))}
    </>
  );
};
