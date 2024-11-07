import CustomSelect from "@/pages/common/components/CustomSelect";
import { useFetchPurchase } from "@/lib/purchase/hooks/useFetchPurchase";
import { LoadingSpinner } from "@/pages/common/components/LoadingSpinner";
import { PurchaseItem } from "./PurchaseItem";
import { useState } from "react";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const PurchaseList = () => {
  const { data, isLoading } = useFetchPurchase();

  const [sortOption, setSortOption] = useState<string>("latest");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

  // 상품 목록 정렬 함수
  const sortedProducts = () => {
    if (!data) return [];
    switch (sortOption) {
      case "latest":
        return [...data].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
      case "priceLow":
        return [...data].sort((a, b) => a.totalPayment - b.totalPayment);
      case "priceHigh":
        return [...data].sort((a, b) => b.totalPayment - a.totalPayment);
      default:
        return data;
    }
  };

  const sortedProductList = sortedProducts();

  const toggleSelectProduct = (id: string) => {
    setSelectedProductIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (!data) return [];
    if (isAllSelected) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(data.map((item) => item.id));
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleCancelOrder = async () => {
    if (selectedProductIds.length === 0) {
      alert("취소 할 상품을 선택해 주세요.");
      return;
    }

    if (window.confirm("선택한 항목을 취소하시겠습니까?")) {
      selectedProductIds.forEach(async (orderId) => {
        const orderDocRef = doc(db, "purchases", orderId);
        await updateDoc(orderDocRef, {
          status: "주문 취소",
        });
      });
      setSelectedProductIds([]);
    }
    // 주문 취소부분 다시 구현해야됨
    // api, react-query hook 로직 작성
    // 주문 취소시 DB에서 삭제는 하지 않되 status : "주문 취소"로 변경
    // 해당 items의 count 만큼 stock 다시 올려주기

    try {
      console.log("주문이 취소되었습니다.");
    } catch (error) {
      console.error("Error cancelling order", error);
    }
  };

  if (isLoading || !data) {
    return <LoadingSpinner size={50} color="#007aff" centered={true} />;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="border-b border-borderGray py-5 px-2">전체</div>
      <div className="flex justify-end gap-2">
        <CustomSelect setSortOption={setSortOption} />
        <button
          onClick={handleCancelOrder}
          className="border border-borderGray py-2 px-4 rounded"
        >
          주문 취소
        </button>
      </div>
      <div className="container mx-auto">
        <table className="w-full border-collapse">
          {/* 테이블 헤더 */}
          <thead>
            <tr className="text-gray-700 border-b border-borderGray text-sm md:text-lg">
              <th className="p-2 text-center w-8">
                <input
                  type="checkbox"
                  aria-label="전체 선택"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
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
            {sortedProductList.map((item) => (
              <PurchaseItem
                key={item.id}
                data={item}
                onToggleSelect={() => toggleSelectProduct(item.id)}
                isSelected={selectedProductIds.includes(item.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
