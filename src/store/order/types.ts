import { CartItem } from "../cart/types";

export interface OrderStore {
  // orderStore에 담겨야 할 데이터의 타입
  // 카트 데이터와 바로구매시
  product: CartItem | CartItem[] | null;
  isDirectPurchase: boolean;
  setDirectPurchase: (product: CartItem) => void;
  setCartOrder: (cartProducts: CartItem[]) => void;
  initOrder: () => void;
  resetOrder: () => void;
}

export interface orderItem {
  productId: string;
  sellerId: string;
  quantity: number;
  price: number;
  title: string;
  count: string;
  id: string;
}

export interface Total {
  totalCount: number;
  totalPrice: number;
}
