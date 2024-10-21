export interface IProduct {
  id: string;
  sellerId: string;
  title: string;
  price: number;
  quantity: number;
  description?: string;
  category: { id: string; name: string };
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewProductDTO {
  sellerId: string;
  title: string;
  price: number;
  quantity: number;
  description?: string;
  category: { id: string; name: string };
  image: File | string | null;
}
