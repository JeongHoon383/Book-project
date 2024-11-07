export interface CartItemDTO {
  productId: string;
  count: number;
  price: number;
}

export interface PurchaseDTO {
  totalPayment: number;
}
