import { useParams } from "react-router-dom";
import { BookMain } from "./components/BookMain";
import { RecommendedBooks } from "./components/RecommendedBooks";
import { useFetchProductById } from "@/lib/product/hooks/useFetchProductById";
import { useFetchAllProducts } from "@/lib/product/hooks/useFetchAllProducts";

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>(); // URL 파라미터에서 ID 가져오기
  const { data: product, isLoading: isProductLoading } = useFetchProductById(
    id!
  ); // 선택된 상품 데이터 가져오기
  const { data: allProducts, isLoading: isAllProductsLoading } =
    useFetchAllProducts(); // 전체 도서 목록 가져오기

  if (isProductLoading || isAllProductsLoading) {
    return <div>로딩중...</div>;
  }

  // 선택된 상품의 category.name과 동일한 도서 필터링
  const filteredBooks = allProducts?.filter(
    (books) =>
      books.category.name === product?.category.name && books.id !== product.id
  );

  return (
    <div className="grid grid-rows-[1fr_1fr] min-h-screen h-full">
      {product ? <BookMain product={product} /> : <div>Loading...</div>}
      {filteredBooks ? (
        <RecommendedBooks books={filteredBooks} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
