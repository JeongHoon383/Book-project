import { Suspense } from "react";
import { ApiErrorBoundary } from "../common/components/ApiErrorBoundary";
import { authStatusType, Layout } from "../common/components/Layout";
import { PurchaseList } from "./components/PurchaseList";
import { usePageTitle } from "@/hooks/usePageTitle";

export const PurchaseHistory = () => {
  usePageTitle("주문관리 - 경향문고");
  return (
    <Layout authStatus={authStatusType.NEED_BUYER}>
      <div className="flex flex-col gap-5">
        <p className="text-3xl font-bold text-title">주문 내역</p>
        <ApiErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <PurchaseList />
          </Suspense>
        </ApiErrorBoundary>
      </div>
    </Layout>
  );
};
