import { useParams } from "react-router-dom";
import { BookMain } from "./components/BookMain";
import { RecommendedBooks } from "./components/RecommendedBooks";
import { useFetchProductById } from "@/lib/product/hooks/useFetchProductById";

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>(); // URL 파라미터에서 ID 가져오기
  const { data, isLoading } = useFetchProductById(id!); // 훅 호출로 데이터 가져오기

  if (isLoading) {
    <div>로딩중...</div>;
  }

  return (
    <div className="grid grid-rows-[1fr_1fr] min-h-screen h-full">
      {data ? <BookMain product={data} /> : <div>Loading...</div>}
      <RecommendedBooks />
    </div>
  );
};
