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
  image: {
    original: string;
    webp: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedProductsDTO {
  products: IProduct[];
  hasNextPage: boolean;
  nextPage?: number;
}

export interface NewProductDTO {
  sellerId: string;
  title: string;
  price: number;
  stock: number;
  description?: string;
  category: { id: string; name: string };
  author: string;
  publishedDate: string;
  image: {
    original: string;
    webp: string;
  };
}
