// 상품 객체 생성 및 초기 상태 설정
// 상품 등록시 필요한 데이터를 일관되게 처리

import { categories } from "@/constants";
import { NewProductDTO } from "@/lib/product/types";

export const createNewProduct = (product: NewProductDTO, imageUrl: string) => {
  const categoryObj = categories.find((cat) => cat.id === product.category.id);
  return {
    ...product,
    price: Number(product.price),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: categoryObj
      ? { id: categoryObj.id, name: categoryObj.name }
      : { id: "0", name: "Unknown" },
    image: imageUrl,
  };
};

export const initialProductState: NewProductDTO = {
  sellerId: "",
  title: "",
  price: 0,
  quantity: 0,
  description: "",
  publishedDate: "",
  author: "",
  category: { id: "", name: "" },
  image: null,
};
