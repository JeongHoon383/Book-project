// src/utils/convertToCarouselType.ts
import { IProduct } from "@/lib/product/types";
import { CartItem } from "@/store/cart/types";

export const convertCartItemToIProduct = (
  cartItems: CartItem[],
  originalProducts: IProduct[]
): IProduct[] => {
  return cartItems.map((item) => {
    const originalProduct = originalProducts.find(
      (product) => product.id === item.id
    );
    return {
      id: item.id,
      sellerId: item.sellerId,
      title: item.title,
      price: item.price,
      stock: originalProduct?.stock || 0, // 원본 제품의 재고량 참조
      category: { id: "", name: "" }, // 필요한 경우 빈 값으로 설정
      author: item.author,
      publishedDate: "",
      image: item.image,
      description: "",
    };
  });
};
