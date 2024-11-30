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
  stock: 0,
  description: "",
  publishedDate: "",
  author: "",
  category: { id: "", name: "" },
  image: {
    webp: "",
    original: "",
  },
};
