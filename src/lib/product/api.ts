import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { IProduct, NewProductDTO } from "./types";
import { db } from "@/firebase";

export const addProductAPI = async (
  productData: NewProductDTO
): Promise<IProduct> => {
  try {
    return await runTransaction(db, async (transcation) => {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("id", "desc"), limit(1));
      const querySnapshot = await getDocs(q); // 최신 데이터 가져오기

      let maxId = 0;
      if (!querySnapshot.empty) {
        maxId = querySnapshot.docs[0].data().id;
      }
      // 만약 상품이 하나도 없으면 empty, maxId를 0으로 설정하고,
      // 상품이 있을 경우 가장 큰 ID를 가져와 새 상품 ID를 계산

      const newId = maxId + 1;

      const newProductData = {
        ...productData,
        id: String(newId),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      // 새로운 상품 데이터 생성, 상품이 생성된 시간과 수정된 시간 기록

      const newDocRef = doc(productsRef); // 새로운 문서 참조 생성
      transcation.set(newDocRef, newProductData);
      // 트랜잭션을 통해 FireStore에 새 상품 데이터를 저장, 이때 newProductData가 저장

      const newProduct: IProduct = {
        ...newProductData,
        id: String(newId),
        image: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // 클라이언트에서 사용하기 위해 시간 값 추가로 반환
      };
      // 새로 추가된 상품 반환
      //

      return newProduct;
    });
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
