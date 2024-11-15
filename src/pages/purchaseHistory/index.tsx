import { PurchaseList } from "./components/PurchaseList";

export const PurchaseHistory = () => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-3xl font-bold text-title">주문 내역</p>
      <PurchaseList />
    </div>
  );
};
