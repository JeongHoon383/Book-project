import { IProduct } from "@/lib/product/types";

export interface ProductState {
  products: IProduct[];
  addProduct: (product: IProduct) => void;
  editableProduct: IProduct | null;
  deleteProduct: (productId: string) => void;
  setEditableProduct: (product: IProduct) => void;
  updateProductInStore: (updatedProduct: IProduct) => void;
}

export interface ProductFilter {
  categoryId: string;
  searchTerm: string;
}
