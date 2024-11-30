import { CartItem } from "../cart/types";

export interface OrderStore {
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
  items: Item[];
  shippingFee: number;
  totalAmount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Total {
  totalCount: number;
  totalPrice: number;
}
