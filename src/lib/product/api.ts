import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  runTransaction,
  serverTimestamp,
  setDoc,
  startAfter,
  where,
} from "firebase/firestore";
import { IProduct, NewProductDTO, PaginatedProductsDTO } from "./types";
import { db } from "@/firebase";

// 상품 조회
export const fetchAllProducts = async (
  pageSize: number,
  pageParam: QueryDocumentSnapshot | null
): Promise<PaginatedProductsDTO> => {
  try {
    console.log("Starting fetch with:", {
      pageSize,
      hasPageParam: !!pageParam,
    });

    const productsRef = collection(db, "products");

    // 쿼리 구성
    let q = query(productsRef, orderBy("createdAt", "desc"), limit(pageSize));

    if (pageParam) {
      q = query(
        productsRef,
        orderBy("createdAt", "desc"),
        startAfter(pageParam),
        limit(pageSize)
      );
    }

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(
      (doc) =>
        ({
          docId: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toISOString(),
          updatedAt: doc.data().updatedAt?.toDate().toISOString(),
        } as IProduct)
    );

    const lastVisible =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;
    const hasNextPage = querySnapshot.docs.length === pageSize;

    console.log("Query result:", {
      fetchedCount: products.length,
      hasNextPage,
      hasLastVisible: !!lastVisible,
    });

    return {
      products,
      hasNextPage,
      lastVisible,
    };
  } catch (error) {
    console.error("Error in fetchAllProducts:", error);
    throw error;
  }
};

// 상품 추가
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
        image: String(productData.image),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      // 새로운 상품 데이터 생성, 상품이 생성된 시간과 수정된 시간 기록

      const newDocRef = doc(productsRef); // 새로운 문서 참조 생성
      transcation.set(newDocRef, newProductData);
      // 트랜잭션을 통해 FireStore에 새 상품 데이터를 저장, 이때 newProductData가 저장

      const newProduct: IProduct = {
        docId: newDocRef.id,
        ...newProductData,
        id: String(newId),
        image: String(productData.image),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // 클라이언트에서 사용하기 위해 시간 값 추가로 반환
      };
      return newProduct; // 새로 추가된 상품 반환
    });
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// 특정 상품을 삭제하는 API
export const deleteProductAPI = async (productId: string): Promise<void> => {
  try {
    const productDocRef = collection(db, "products");
    const q = query(productDocRef, where("id", "==", productId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("해당 상품을 찾을 수 없습니다");
    }

    const docToDelete = querySnapshot.docs[0];
    await deleteDoc(docToDelete.ref);
    console.log("Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// 상품 수정 API
export const updateProductAPI = async (
  productId: string,
  updatedData: NewProductDTO
): Promise<void> => {
  try {
    // productId는 Firestore 문서의 고유 ID
    const productDocRef = doc(db, "products", productId);

    // 문서 업데이트, 기존 데이터와 병합 (merge : true)
    await setDoc(
      productDocRef,
      {
        ...updatedData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log("Product updated successfully");
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
};
