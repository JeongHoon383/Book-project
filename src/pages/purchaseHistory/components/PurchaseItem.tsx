import { OrderItem } from "@/store/order/types";

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
  return (
    <>
      {data.items.map((item) => (
        <tr
          key={item.productId}
          className="text-center text-sm md:text-base border-b border-borderGray py-10"
        >
          <td className="p-2">
            <input
              type="checkbox"
              aria-label="주문 항목 선택"
              checked={isSelected}
              onChange={onToggleSelect}
            />
          </td>
          <td className="p-2 flex items-center space-x-1 md:space-x-4 text-left py-10">
            <img
              src={item.image}
              className="w-8 h-8 md:w-24 md:h-24 object-contain rounded"
            />
            <span className="text-left md:max-w-none md:whitespace-normal md:overflow-visible md:truncate-ellipsis max-w-[90px] truncate overflow-hidden whitespace-nowrap">
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
          {/*  */}
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
