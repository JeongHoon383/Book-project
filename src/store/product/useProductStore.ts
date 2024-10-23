import { IProduct } from "@/lib/product/types";
import { create } from "zustand";

interface ProductState {
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
  editableProduct: IProduct | null; // 수정할 상품의 상태 추가
  setEditableProduct: (product: IProduct | null) => void; // 수정할 상품 설정 함수
  updateProductInStore: (updatedProduct: IProduct) => void; // 수정된 상품 상태를 업데이트하는 함수
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  editableProduct: null, // 초기값 설정
  setProducts: (products) => set(() => ({ products })),
  setEditableProduct: (product) => set(() => ({ editableProduct: product })), // 수정할 상품 설정
  updateProductInStore: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.docId === updatedProduct.docId ? updatedProduct : product
      ),
    })), // 수정된 상품 상태를 직접 업데이트
}));
