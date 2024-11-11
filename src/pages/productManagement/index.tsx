import { ProductList } from "./components/ProductList";

export const ProductManageMent = () => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-3xl font-bold text-title">상품 관리</p>
      <ProductList />
    </div>
  );
};
