import { IProduct } from "@/lib/product/types";
import { create } from "zustand";
import { ProductState } from "./types";

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

  setEditableProduct: (product) => set(() => ({ editableProduct: product })),

  updateProductInStore: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      ),
    })),
}));
