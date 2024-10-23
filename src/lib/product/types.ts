export interface IProduct {
  docId: string; // Firestore 문서의 고유 ID 추가
  id: string;
  sellerId: string;
  title: string;
  price: number;
  quantity: number;
  description?: string;
  category: { id: string; name: string };
  author: string;
  publishedDate: string;
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
  author: string;
  publishedDate: string;
  image: File | string | null;
}
