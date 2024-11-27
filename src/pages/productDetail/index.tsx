import { Suspense } from "react";
import { ApiErrorBoundary } from "../common/components/ApiErrorBoundary";
import { authStatusType, Layout } from "../common/components/Layout";
import { ProductDetailWrapper } from "./components/ProductDetailWrapper";

export const ProductDetail = () => {
  return (
    <Layout authStatus={authStatusType.NEED_LOGIN}>
      <ApiErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductDetailWrapper />
        </Suspense>
      </ApiErrorBoundary>
    </Layout>
  );
};
