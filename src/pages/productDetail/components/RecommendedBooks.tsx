import { IProduct } from "@/lib/product/types";
import { Carousel } from "@/pages/common/components/Carousel";
import { useEffect, useState } from "react";

interface RecommendedBooksProps {
  books: IProduct[];
}

export const RecommendedBooks: React.FC<RecommendedBooksProps> = ({
  books,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(5); // itemsPerPage 상태 추가

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(5);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  return (
    <div className="p-2.5 h-full grid grid-rows-[1fr_9fr] mb-10">
      <div className="flex items-center text-xl font-bold mb-2.5">
        <div>추천 도서</div>
      </div>
      <Carousel
        key={itemsPerPage}
        items={books}
        itemsPerPage={itemsPerPage}
        renderItem={(item) => (
          <div className="flex flex-col">
            <img
              src={item.image}
              className="w-full h-full max-h-[280px] justify-center object-contain"
            />
            <div className="flex flex-col items-center h-full justify-center gap-1">
              <div className="text-center mt-2 overflow-hidden text-ellipsis whitespace-normal line-clamp-1">
                {item.title}
              </div>
              <div className="text-sm text-gray-500">{item.author}</div>
              <div className="text-sm">{item.price.toLocaleString()}원</div>
            </div>
          </div>
        )}
      />
    </div>
  );
};
