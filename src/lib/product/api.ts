import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { IProduct, NewProductDTO } from "./types";
import { db } from "@/firebase";
import { PRODUCT_KEY } from "./key";

// 상품 조회
export const fetchProducts = async () => {
  try {
    const q = query(collection(db, PRODUCT_KEY), orderBy("id", "desc"));
    const querySnapshot = await getDocs(q);

    const products = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: String(data.id),
        sellerId: data.sellerId,
        title: data.title,
        price: Number(data.price),
        stock: data.stock,
        description: data.description,
        category: data.category,
        author: data.author,
        publishedDate: data.publishedDate,
        image: data.image || "",
        createdAt: data.createdAt?.toDate().toISOString(),
        updatedAt: data.updatedAt?.toDate().toISOString(),
      };
    }) as IProduct[];

    return products;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};

// 상품 추가
export const addProductAPI = async (
  productData: NewProductDTO
): Promise<IProduct> => {
  // Promise<IProduct> 추가된 데이터를 받았을 때 받는 데이터의 타입
  // 데이터를 다시 반환하는 이유 : 1. 추가가 잘 되었는지 확인, 2. 반환된 데이터를 즉시 client측에 반영 - 추후 데이터를 다시 부를 필요가 없음 성능면에서 효율적
  try {
    return await runTransaction(db, async (transcation) => {
      const productsRef = collection(db, PRODUCT_KEY); // db 내의 PRODUCT_KEY 라는 컬렉션 접근
      const q = query(productsRef, orderBy("id", "desc"), limit(1)); // productRef 라는 컬렉션 안에 가장 최신화된 문서(id 기준 내림차순 정렬시 가장 높은값이 최신에 추가된 것) 1개를 가져옴
      const querySnapshot = await getDocs(q); // q에 해당하는 데이터를 querySnapshot에 저장

      let maxId = 0;
      if (!querySnapshot.empty) {
        maxId = querySnapshot.docs[0].data().id;
      }
      // 데이터가 비어있을 때를 대비
      // 아이디값을 저장하는 이유 : 가장 최신화된 아이디를 저장함으로써 문서의 id 값을 순차적으로 배치 할 수 있음

      const newId = maxId + 1;

      const newProductData = {
        ...productData,
        id: String(newId),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }; // 데이터를 어떻게 추가할건지 세팅

      const newDocRef = doc(productsRef); // 문서를 저장할 위치 설정
      transcation.set(newDocRef, newProductData); // 데이터 저장

      const newProduct: IProduct = {
        ...newProductData,
        id: String(newId),
        image: "", // 왜 이미지를 초기화?
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return newProduct;
    });
  } catch (error) {
    console.error("Error adding product", error);
    throw error;
  }
};

// 상품 삭제
export const deleteProductAPI = async (productId: string): Promise<void> => {
  try {
    const productDocRef = collection(db, PRODUCT_KEY);
    const q = query(productDocRef, where("id", "==", productId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("해당 상품을 찾을 수 없습니다");
    }

    const docToDelete = querySnapshot.docs[0];
    await deleteDoc(docToDelete.ref); // 여기서 왜 ref? docToDelete에 문서가 잘 담겨있지 않음?
    console.log("Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw error;
  }
};

// 상품 업데이트
export const updateProductAPI = async (
  productId: string,
  updateData: NewProductDTO
): Promise<void> => {
  try {
    const productDocRef = collection(db, PRODUCT_KEY);
    const q = query(productDocRef, where("id", "==", productId));
    const querySnapshot = await getDocs(q);

    const docToUpdate = querySnapshot.docs[0];

    await setDoc(
      docToUpdate.ref,
      {
        ...updateData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log("product updated successfully");
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
};
