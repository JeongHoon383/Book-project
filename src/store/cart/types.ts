export interface CartStore {
  cart: CartItem[];
  totalCount: number;
  totalPrice: number;
  initCart: (userId: string) => void;
  resetCart: (userId: string) => void;
  addCartItem: (item: CartItem, userId: string, count: number) => void;
  increaseItemCount: (userId: string) => void;
  decreaseItemCount: (userId: string) => void;
  removeCartItem: (itemId: string, userId: string) => void;
}

export interface CartItem {
  id: string;
  sellerId: string;
  image: string;
  title: string;
  price: number;
  count: number;
  stock: number;
  author: string;
}

export interface Total {
  totalCount: number;
  totalPrice: number;
}
