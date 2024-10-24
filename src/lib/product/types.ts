import { QueryDocumentSnapshot } from "firebase/firestore";

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

export interface PaginatedProductsDTO {
  products: IProduct[];
  hasNextPage: boolean;
  lastVisible: QueryDocumentSnapshot | null;
  totalCount?: number; // 선택적으로 전체 개수 추가
} // 페이지네이션 처리된 상품 리스트

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
