import { getItem, setItem } from "@/helpers/localStroage";
import { CartItem } from "../cart/types";
import { parseJSON } from "@/lib/utils/common";
import { Total } from "./types";

const ORDER_LOCAL_STORAGE_KEY = "ORDER_LOCAL_STORAGE_KEY";

export const getOrderFromLocalStorage = (): {
  product: CartItem[] | null;
} => {
  const orderData = getItem(ORDER_LOCAL_STORAGE_KEY);
  const parsedData = parseJSON(orderData) as {
    product: CartItem[] | null;
  } | null;

  return parsedData ?? { product: null };
};

export const setOrderToLocalStorage = (product: CartItem[]): void => {
  setItem(ORDER_LOCAL_STORAGE_KEY, { product });
};

export const resetOrderAtLocalStorage = (): void => {
  setItem(ORDER_LOCAL_STORAGE_KEY, { product: null });
};

export const calculateTotal = (orderData: CartItem[] | null): Total => {
  if (orderData) {
    return orderData.reduce(
      (acc: Total, item: CartItem) => ({
        totalCount: acc.totalCount + item.count,
        totalPrice: acc.totalPrice + item.price * item.count,
      }),
      { totalCount: 0, totalPrice: 0 }
    );
  } else {
    return { totalCount: 0, totalPrice: 0 };
  }
};
