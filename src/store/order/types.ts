import { CartItem } from "../cart/types";

export interface OrderStore {
  // orderStore에 담겨야 할 데이터의 타입
  // 카트 데이터와 바로구매시
  product: CartItem[] | null;
  setOrder: (products: CartItem | CartItem[]) => void;
  initOrder: () => void;
  resetOrder: () => void;
}

export interface Item {
  count: number;
  price: number;
  productId: string;
  sellerId: string;
  title: string;
  image: {
    original: string;
    webp: string;
  };
}

export interface OrderItem {
  id: string;
  buyerId: string;
  status: string;
  totalPayment: number;
  items: Item[]; // Item 타입의 배열로 정의
  shippingFee: number;
  totalAmount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Total {
  totalCount: number;
  totalPrice: number;
}
