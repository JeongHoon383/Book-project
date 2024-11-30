import { IProduct } from "@/lib/product/types";
import React, { useEffect, useState } from "react";
interface CarouselProps {
  items: IProduct[];
  itemsPerPage: number;
  renderItem: (item: IProduct) => React.ReactNode;
  renderPrevArrow?: () => React.ReactNode;
  renderNextArrow?: () => React.ReactNode;
  showArrowsOnHover?: boolean;
  direction?: "row" | "column";
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  itemsPerPage,
  renderItem,
  renderPrevArrow,
  renderNextArrow,
  showArrowsOnHover = true,
  direction = "row",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIdx, startIdx + itemsPerPage);
    if (currentItems.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [items, currentPage, itemsPerPage]);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : 1));
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : totalPages));
  };

  return (
    <div
      className="relative border border-borderGray p-5 rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-full flex flex-col justify-between">
        <div className="flex justify-end mb-5">
          {currentPage} / {totalPages}
        </div>
        <div
          className={`grid gap-4 w-full h-full overflow-hidden ${
            direction === "row" ? `grid-cols-${itemsPerPage}` : "grid-rows-1"
          }`}
          style={{
            gridTemplateColumns:
              direction === "row"
                ? `repeat(${itemsPerPage}, minmax(0, 1fr))`
                : undefined,
            gridTemplateRows:
              direction === "column"
                ? `repeat(${itemsPerPage}, minmax(0, 1fr))`
                : undefined,
          }}
        >
          {items
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item, index) => (
              <div key={index}>{renderItem(item)}</div>
            ))}
        </div>
      </div>
      {(showArrowsOnHover ? isHovered : true) && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2"
          >
            {renderPrevArrow ? renderPrevArrow() : <DefaultPrevArrow />}
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2"
          >
            {renderNextArrow ? renderNextArrow() : <DefaultNextArrow />}
          </button>
        </>
      )}
    </div>
  );
};

const DefaultPrevArrow = () => <span className="text-2xl">&#9664;</span>;
const DefaultNextArrow = () => <span className="text-2xl">&#9654;</span>;
