import { usePageTitle } from "@/hooks/usePageTitle";
import { ApiErrorBoundary } from "../common/components/ApiErrorBoundary";
import { authStatusType, Layout } from "../common/components/Layout";
import { ProductList } from "./components/ProductList";

export const ProductManageMent = () => {
  usePageTitle("상품관리 - 경향문고");
  return (
    <Layout authStatus={authStatusType.NEED_SELLER}>
      <div className="flex flex-col gap-5">
        <p className="text-3xl font-bold text-title">상품 관리</p>
        <ApiErrorBoundary>
          <ProductList />
        </ApiErrorBoundary>
      </div>
    </Layout>
  );
};
