import { IProduct } from "@/lib/product/types";
import React, { useState } from "react";
interface CarouselProps {
  items: IProduct[];
  itemsPerPage: number;
  renderItem: (item: IProduct) => React.ReactNode;
  renderPrevArrow?: () => React.ReactNode; // 커스텀 이전 화살표 렌더링 함수
  renderNextArrow?: () => React.ReactNode; // 커스텀 다음 화살표 렌더링 함수
  showArrowsOnHover?: boolean; // hover 상태에서 화살표 표시 여부
  direction?: "row" | "column"; // 가로 또는 세로 방향 설정 추가
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  itemsPerPage,
  renderItem,
  renderPrevArrow,
  renderNextArrow,
  showArrowsOnHover = true, // 기본값을 hover 상태에서 표시로 설정
  direction = "row", // 기본 방향을 "row"로 설정
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const [isHovered, setIsHovered] = useState(false);

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
          }`} // direction에 따라 가로 또는 세로 grid 설정
          style={{
            gridTemplateColumns:
              direction === "row"
                ? `repeat(${itemsPerPage}, minmax(0, 1fr))`
                : undefined, // direction이 "row"일 때만 gridTemplateColumns 설정
            gridTemplateRows:
              direction === "column"
                ? `repeat(${itemsPerPage}, minmax(0, 1fr))`
                : undefined, // direction이 "column"일 때만 gridTemplateRows 설정
          }}
        >
          {items
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item, index) => (
              <div key={index}>{renderItem(item)}</div>
            ))}
        </div>
      </div>
      {/* 화살표 렌더링 */}
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

// 기본 화살표 컴포넌트
const DefaultPrevArrow = () => <span className="text-2xl">&#9664;</span>;
const DefaultNextArrow = () => <span className="text-2xl">&#9654;</span>;
