import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
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
import { ALL_CATEGORY_ID } from "@/constants";
import { ProductFilter } from "@/store/product/types";

let lastVisibleDocument: QueryDocumentSnapshot<DocumentData> | null = null;
export const fetchAllProductsAPI = async (): Promise<IProduct[]> => {
  try {
    const productDocRef = collection(db, "products");
    const q = query(productDocRef, orderBy("id", "desc"));

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
      } as IProduct;
    });

    return products;
  } catch (error) {
    console.error("Error fetching all products: ", error);
    throw error;
  }
};

export const fetchProductsAPI = async (
  filter: ProductFilter,
  pageSize: number,
  page: number
): Promise<PaginatedProductsDTO> => {
  try {
    let q = query(
      collection(db, "products"),
      orderBy("id", "desc"),
      limit(pageSize)
    );
    if (filter.categoryId && filter.categoryId !== ALL_CATEGORY_ID) {
      q = query(
        q,
        where("category.id", "==", filter.categoryId),
        limit(pageSize)
      );
    }

    if (filter.searchTerm) {
      const start = filter.searchTerm;
      const end = filter.searchTerm + "\uf8ff";
      q = query(q, where("title", ">=", start), where("title", "<=", end));
    }

    if (page > 1 && lastVisibleDocument) {
      q = query(q, startAfter(lastVisibleDocument));
    }

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      lastVisibleDocument = querySnapshot.docs[querySnapshot.docs.length - 1];
    }

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

    const hasNextPage = querySnapshot.size === pageSize;
    const nextPage = hasNextPage ? page + 1 : undefined;

    return { products, hasNextPage, nextPage };
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};

export const addProductAPI = async (
  productData: NewProductDTO
): Promise<IProduct> => {
  try {
    return await runTransaction(db, async (transaction) => {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("id", "desc"), limit(1));
      const querySnapshot = await getDocs(q);

      let maxId = 0;
      if (!querySnapshot.empty) {
        maxId = querySnapshot.docs[0].data().id;
      }

      const newId = maxId + 1;
      const newDocRef = doc(productsRef);

      const newProductData = {
        ...productData,
        id: String(newId),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      transaction.set(newDocRef, newProductData);

      const newProduct: IProduct = {
        ...newProductData,
        id: String(newId),
        image: {
          original: "",
          webp: "",
        },
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
    console.error("Error deleting product: ", error);
    throw error;
  }
};

export const updateProductAPI = async (
  productId: string,
  updateData: NewProductDTO
): Promise<void> => {
  try {
    const productDocRef = collection(db, "products");
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
