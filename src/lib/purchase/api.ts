import { CartItem } from "@/store/cart/types";
import { CartItemDTO, PurchaseDTO } from "./types";
import {
  collection,
  doc,
  DocumentReference,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { PRODUCT_KEY } from "../product/key";
import { Item, OrderItem } from "@/store/order/types";

// 주문 상품 조회
export const fetchPurchaseAPI = async (): Promise<OrderItem[]> => {
  try {
    const productDocRef = collection(db, "purchases");
    const q = query(productDocRef, orderBy("id", "desc"));

    const querySnapshot = await getDocs(q);

    const products = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: data.id,
        buyerId: data.buyerId,
        status: data.status,
        items: (data.items || []).map((item: Item) => ({
          count: item.count,
          price: item.price,
          productId: item.productId,
          sellerId: item.sellerId,
          title: item.title,
          image: item.image,
        })),
        shippingFee: data.shippingFee,
        totalAmount: data.totalAmount,
        totalPayment: data.totalPayment,
        createdAt: data.createdAt?.toDate().toISOString(),
        updatedAt: data.updatedAt?.toDate().toISOString(),
      } as OrderItem;
    });

    return products;
  } catch (error) {
    console.error("Error fetching purchases", error);
    throw error;
  }
};

// 주문상품 추가
export const makePurchaseAPI = async (
  purchaseData: PurchaseDTO,
  userId: string,
  orderData: CartItem[] | CartItem | null
): Promise<void> => {
  try {
    await runTransaction(db, async (transcation) => {
      if (!orderData || (Array.isArray(orderData) && orderData.length === 0)) {
        throw new Error("장바구니가 비어 있습니다.");
      }

      const purchasesRef = collection(db, "purchases");
      const q = query(purchasesRef, orderBy("id", "desc"), limit(1)); // productRef 라는 컬렉션 안에 가장 최신화된 문서(id 기준 내림차순 정렬시 가장 높은값이 최신에 추가된 것) 1개를 가져옴
      const querySnapshot = await getDocs(q);

      let maxId = 0;
      if (!querySnapshot.empty) {
        maxId = querySnapshot.docs[0].data().id;
      }

      const newId = maxId + 1;

      const cartItemDTOs: CartItemDTO[] = Array.isArray(orderData)
        ? orderData.map((item) => ({
            productId: item.id,
            sellerId: item.sellerId,
            count: item.count,
            price: item.price,
            title: item.title,
            image: item.image,
          }))
        : [
            {
              productId: orderData.id,
              sellerId: orderData.sellerId,
              count: orderData.count,
              price: orderData.price,
              title: orderData.title,
              image: orderData.image,
            },
          ];

      const newPurchaseData = {
        ...purchaseData,
        id: Number(newId),
        buyerId: userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: "주문 완료",
        items: cartItemDTOs,
      };

      const newPurchaseRef = doc(purchasesRef);
      transcation.set(newPurchaseRef, newPurchaseData);

      // 각 상품의 재고 업데이트: 읽기 후 쓰기
      const stockUpdates: { ref: DocumentReference; newStock: number }[] = [];

      if (Array.isArray(orderData)) {
        for (const item of orderData) {
          const productRef = collection(db, PRODUCT_KEY);
          const productQuery = query(productRef, where("id", "==", item.id));
          const productSnapshot = await getDocs(productQuery);

          if (!productSnapshot.empty) {
            const productDoc = productSnapshot.docs[0];
            const currentStock = productDoc.data().stock;
            const newStock = currentStock - item.count;

            // 업데이트할 상품과 새 재고를 저장
            stockUpdates.push({
              ref: doc(db, PRODUCT_KEY, productDoc.id),
              newStock,
            });
          } else {
            console.error(`상품이 존재하지 않습니다: ID ${item.id}`);
          }
        }
      } else if (orderData) {
        // 단일 객체일 경우 직접 처리
        const productRef = collection(db, PRODUCT_KEY);
        const productQuery = query(productRef, where("id", "==", orderData.id));
        const productSnapshot = await getDocs(productQuery);

        if (!productSnapshot.empty) {
          const productDoc = productSnapshot.docs[0];
          const currentStock = productDoc.data().stock;
          const newStock = currentStock - orderData.count;

          // 업데이트할 상품과 새 재고를 저장
          stockUpdates.push({
            ref: doc(db, PRODUCT_KEY, productDoc.id),
            newStock,
          });
        } else {
          console.error(`상품이 존재하지 않습니다: ID ${orderData.id}`);
        }
      }

      // 읽기 완료 후 한 번에 쓰기 작업 수행
      stockUpdates.forEach(({ ref, newStock }) => {
        transcation.update(ref, { stock: newStock });
      });
    });
  } catch (error) {
    console.error("Error making purchase: ", error);
    throw error;
  }
};
