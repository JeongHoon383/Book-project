import { pageRoutes } from "@/apiRoutes";
import { IProduct } from "@/lib/product/types";
import { Carousel } from "@/pages/common/components/Carousel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface RecommendedBooksProps {
  books: IProduct[];
}

export const RecommendedBooks: React.FC<RecommendedBooksProps> = ({
  books,
}) => {
  const navigate = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleNavigate = (id: string) => {
    navigate(`${pageRoutes.productDetail}/${id}`);
  };

  function debounce(func: () => void, wait: number) {
    let timeout: NodeJS.Timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(), wait);
    };
  }

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

    const debouncedResize = debounce(updateItemsPerPage, 200);

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
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
            <picture>
              <source srcSet={item.image.webp} type="image/webp" />
              <source srcSet={item.image.original} type="image/jpeg" />
              <img
                src={item.image.original}
                className="w-full max-h-[200px] justify-center object-contain cursor-pointer"
                onClick={() => handleNavigate(item.id)}
              />
            </picture>
            <div className="flex flex-col items-center h-full justify-center gap-1">
              <div
                className="max-w-[130px] text-center font-bold mt-2 overflow-hidden text-ellipsis whitespace-normal line-clamp-1 cursor-pointer hover:underline"
                onClick={() => handleNavigate(item.id)}
              >
                {item.title}
              </div>
              <div className=" text-gray-500">{item.author}</div>
              <div>{item.price.toLocaleString()}원</div>
            </div>
          </div>
        )}
      />
    </div>
  );
};
