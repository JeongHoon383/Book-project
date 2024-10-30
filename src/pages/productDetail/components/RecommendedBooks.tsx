import { IProduct } from "@/lib/product/types";
import { Carousel } from "@/pages/common/components/Carousel";

interface RecommendedBooksProps {
  books: IProduct[];
}

export const RecommendedBooks: React.FC<RecommendedBooksProps> = ({
  books,
}) => {
  return (
    <div className="p-2.5 grid grid-rows-[1fr_9fr]">
      <div className="flex justify-between items-center mb-2.5">
        <div>추천 도서</div>
        <div>추천 상품 더보기</div>
      </div>
      <Carousel
        items={books}
        itemsPerPage={5}
        renderItem={(item) => (
          <div className="grid grid-rows-[8fr_2fr] items-center">
            <img
              src={item.image}
              className="w-full h-full max-h-[320px] object-contain"
            />
            <div className="flex flex-col items-center gap-1">
              <div className="text-center mt-2">{item.title}</div>
              <div className="text-sm text-gray-500">{item.author}</div>
              <div className="text-sm">{item.price.toLocaleString()}원</div>
            </div>
          </div>
        )}
      />
    </div>
  );
};
