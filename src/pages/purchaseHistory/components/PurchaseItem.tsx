export const PurchaseItem = () => {
  return (
    <>
      <tr className="text-center text-sm md:text-base border-b border-borderGray py-10">
        <td className="p-2">
          <input type="checkbox" aria-label="주문 항목 선택" />
        </td>
        <td className="p-2 flex items-center space-x-1 md:space-x-4 text-left py-10">
          <img
            src="https://via.placeholder.com/100"
            alt="상품 이미지"
            className="w-8 h-8 md:w-24 md:h-24 object-cover rounded"
          />
          <span className="text-left md:max-w-none md:whitespace-normal md:overflow-visible md:truncate-ellipsis max-w-[90px] truncate overflow-hidden whitespace-nowrap">
            상품1상품1상품1상품1
          </span>
        </td>
        <td className="p-2 hidden md:table-cell">20,000원</td>
        <td className="p-2 hidden md:table-cell">seller123</td>
        <td className="p-2 hidden md:table-cell">주문 완료</td>
        <td className="p-2">1</td>
        <td className="p-2 hidden md:table-cell">3,000원</td>
        <td className="p-2">23,000원</td>
        <td className="p-2 hidden md:table-cell">2024-11-01</td>
      </tr>
    </>
  );
};
