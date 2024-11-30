import CustomSelect from "@/pages/common/components/CustomSelect";
import { useFetchPurchase } from "@/lib/purchase/hooks/useFetchPurchase";
import { PurchaseItem } from "./PurchaseItem";
import { useState } from "react";
import { useCancelPurchase } from "@/lib/purchase/hooks/useCancelPurchase";
import { Button } from "@/pages/common/components/Button";
import { LoadingPage } from "@/pages/loading/components/LoadingPage";

export const PurchaseList = () => {
  const { data, isLoading } = useFetchPurchase();
  const cancelMutation = useCancelPurchase();

  const [sortOption, setSortOption] = useState<string>("latest");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

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

    if (window.confirm("선택한 상품을 주문 취소하시겠습니까?")) {
      selectedProductIds.forEach((id) => cancelMutation.mutate(id));
      setSelectedProductIds([]);
    }
  };

  if (isLoading || !data) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 border-b border-borderGray py-5 text-xs font-bold">
        <div>전체 {data?.length}</div>
        <div>
          주문 완료 {data?.filter((item) => item.status === "주문 완료").length}
        </div>
        <div>
          주문 취소 {data?.filter((item) => item.status === "주문 취소").length}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button text="주문취소" onClick={handleCancelOrder}></Button>
        <CustomSelect setSortOption={setSortOption} />
      </div>
      <div className="container mx-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-gray-700 border-b border-borderGray text-sm">
              <th className="p-2 text-center w-8">
                <input
                  type="checkbox"
                  aria-label="전체 선택"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="md:px-5 px-2 text-left w-1/3">상품명</th>
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
