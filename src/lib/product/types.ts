export interface IProduct {
  id: string;
  sellerId: string;
  title: string;
  price: number;
  stock: number;
  description?: string;
  category: { id: string; name: string };
  author: string;
  publishedDate: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedProductsDTO {
  products: IProduct[];
  hasNextPage: boolean;
  nextPage?: number;
} // 페이지네이션 처리된 상품 리스트

export interface NewProductDTO {
  sellerId: string;
  title: string;
  price: number;
  stock: number;
  description?: string;
  category: { id: string; name: string };
  author: string;
  publishedDate: string;
  image: File | string | null;
}

export interface DetailProduct {
  id: string;
  title: string;
  price: number;
  description?: string;
  category: { id: string; name: string };
  author: string;
  publishedDate: string;
  image: string;
}
