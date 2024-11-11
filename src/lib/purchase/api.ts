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
  orderData: CartItem[] | null
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

      const cartItemDTOs: CartItemDTO[] = orderData.map((item) => ({
        productId: item.id,
        sellerId: item.sellerId,
        count: item.count,
        price: item.price,
        title: item.title,
        image: item.image,
      }));

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

      for (const item of orderData) {
        const productRef = collection(db, "products");
        const productQuery = query(productRef, where("id", "==", item.id));
        const productSnapshot = await getDocs(productQuery);

        if (!productSnapshot.empty) {
          const productDoc = productSnapshot.docs[0];
          const currentStock = productDoc.data().stock;
          const newStock = currentStock - item.count;

          // 업데이트할 상품과 새 재고를 저장
          stockUpdates.push({
            ref: doc(db, "products", productDoc.id),
            newStock,
          });
        } else {
          console.error(`상품이 존재하지 않습니다: ID ${item.id}`);
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

// 상품 상태 취소 변경
export const cancelPurchaseAPI = async (productId: string): Promise<void> => {
  try {
    await runTransaction(db, async (transaction) => {
      const productDocRef = collection(db, "purchases");
      const q = query(productDocRef, where("id", "==", productId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("해당 상품을 찾을 수 없습니다");
      }

      const orderDoc = querySnapshot.docs[0];
      const orderData = orderDoc.data();

      // 주문 상태를 "주문 취소"로 업데이트
      transaction.update(orderDoc.ref, { status: "주문 취소" });

      // 주문에 포함된 각 상품의 stock 업데이트
      const items = orderData.items as Item[];
      for (const item of items) {
        const productRef = collection(db, "products");
        const productQuery = query(
          productRef,
          where("id", "==", item.productId)
        );
        const productSnapshot = await getDocs(productQuery);

        if (!productSnapshot.empty) {
          const productDoc = productSnapshot.docs[0];
          const currentStock = productDoc.data().stock;
          const newStock = currentStock + item.count; // stock 증가

          // Transaction을 통해 stock 업데이트
          transaction.update(productDoc.ref, { stock: newStock });
        } else {
          console.error(`상품이 존재하지 않습니다 : ID ${item.productId}`);
        }
      }
    });
  } catch (error) {
    console.error("주문 취소 중 오류 발생", error);
  }
};
