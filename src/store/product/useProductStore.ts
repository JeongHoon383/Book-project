import { IProduct } from "@/lib/product/types";
import { create } from "zustand";

interface ProductState {
  products: IProduct[];
  addProduct: (product: IProduct) => void;
  editableProduct: IProduct | null;
  deleteProduct: (productId: string) => void;
  setEditableProduct: (product: IProduct) => void;
  updateProductInStore: (updatedProduct: IProduct) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  editableProduct: null,

  addProduct: (product: IProduct) =>
    set((state) => ({
      products: [...state.products, product],
    })),

  deleteProduct: (productId: string) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),

  setEditableProduct: (product) => set(() => ({ editableProduct: product })), // 수정할 상품 설정

  updateProductInStore: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      ),
    })),
}));
