import { getItem, setItem } from "@/helpers/localStroage";
import { CartItem } from "../cart/types";
import { parseJSON } from "@/lib/utils/common";
import { Total } from "./types";

const ORDER_LOCAL_STORAGE_KEY = "ORDER_LOCAL_STORAGE_KEY";

export const getOrderFromLocalStorage = (): {
  product: CartItem | CartItem[] | null;
  isDirectPurchase: boolean;
} => {
  const orderData = getItem(ORDER_LOCAL_STORAGE_KEY);
  // parseJSON이 null일 경우 기본값 반환
  const parsedData = parseJSON(orderData) as {
    product: CartItem | CartItem[] | null;
    isDirectPurchase: boolean;
  } | null;

  return parsedData ?? { product: null, isDirectPurchase: false };
};

export const setOrderToLocalStorage = (
  product: CartItem | CartItem[],
  isDirectPurchase: boolean
): void => {
  setItem(ORDER_LOCAL_STORAGE_KEY, { product, isDirectPurchase });
};

export const resetOrderAtLocalStorage = (): void => {
  setItem(ORDER_LOCAL_STORAGE_KEY, { product: null, isDirectPurchase: false });
};

export const calculateTotal = (
  orderData: CartItem[] | CartItem | null
): Total => {
  if (Array.isArray(orderData)) {
    // cart가 배열인 경우
    return orderData.reduce(
      (acc: Total, item: CartItem) => ({
        totalCount: acc.totalCount + item.count,
        totalPrice: acc.totalPrice + item.price * item.count,
      }),
      { totalCount: 0, totalPrice: 0 }
    );
  } else if (orderData) {
    // cart가 단일 객체인 경우
    return {
      totalCount: orderData.count,
      totalPrice: orderData.price * orderData.count,
    };
  } else {
    // cart가 null인 경우 기본값 반환
    return { totalCount: 0, totalPrice: 0 };
  }
};
