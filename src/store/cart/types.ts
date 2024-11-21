export interface CartStore {
  cart: CartItem[];
  totalCount: number;
  totalPrice: number;
  initCart: (userId: string) => void;
  resetCart: (userId: string) => void;
  addCartItem: (item: CartItem, userId: string, count: number) => void;
  increaseItemCount: (itemId: string, userId: string) => void;
  decreaseItemCount: (itemId: string, userId: string) => void;
  removeCartItem: (itemId: string, userId: string) => void;
}

export interface CartItem {
  id: string;
  sellerId: string;
  image: {
    original: string;
    webp: string;
  };
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
