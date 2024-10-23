import { Suspense } from "react";
import { ApiErrorBoundary } from "../common/components/ApiErrorBoundary";
import { ProductList } from "./components/ProductList";

export const ProductManageMent = () => {
  return (
    <ApiErrorBoundary>
      <Suspense fallback={<LoadingSkeleton />}>
        <ProductList />
      </Suspense>
    </ApiErrorBoundary>
  );
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {[...Array(12)].map((_, index) => (
      <div key={index} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
    ))}
  </div>
);
