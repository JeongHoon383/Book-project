export interface CartStore {
  cart: CartItem[];
  totalCount: number;
  totalPrice: number;
  initCart: (userId: string) => void;
  resetCart: (userId: string) => void;
  addCartItem: (item: CartItem, userId: string, count: number) => void;
}

export interface CartItem {
  id: string;
  sellerId: string;
  image: string;
  title: string;
  price: number;
  count: number;
}

export interface Total {
  totalCount: number;
  totalPrice: number;
}
