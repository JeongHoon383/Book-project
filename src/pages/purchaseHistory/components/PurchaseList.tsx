import CustomSelect from "@/pages/common/components/CustomSelect";
import { PurchaseItem } from "./PurchaseItem";

export const PurchaseList = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="border-b border-borderGray py-5 px-2">전체</div>
      <div className="flex justify-end gap-2">
        <CustomSelect />
        <button className="border border-borderGray py-2 px-4 rounded">
          주문 취소
        </button>
      </div>
      <div className="container mx-auto">
        <table className="w-full border-collapse">
          {/* 테이블 헤더 */}
          <thead>
            <tr className="text-gray-700 border-b border-borderGray text-sm md:text-lg">
              <th className="p-2 text-center w-8">
                <input type="checkbox" aria-label="전체 선택" />
              </th>
              <th className="p-2 text-left w-1/3">상품명</th>
              <th className="p-2 text-center hidden md:table-cell">
                상품 금액
              </th>
              <th className="p-2 text-center hidden md:table-cell">판매자ID</th>
              <th className="p-2 text-center hidden md:table-cell">상태</th>
              <th className="p-2 text-center">수량</th>
              <th className="p-2 text-center hidden md:table-cell">배송비</th>
              <th className="p-2 text-center">결제 금액</th>
              <th className="p-2 text-center hidden md:table-cell">주문일</th>
            </tr>
          </thead>
          {/* 테이블 바디 */}
          <tbody>
            <PurchaseItem />
          </tbody>
        </table>
      </div>
    </div>
  );
};
