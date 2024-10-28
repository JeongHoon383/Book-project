import React, { useState } from "react";

interface Book {
  image: string;
  title: string;
  author: string;
  publishedDate: string;
  description: string;
  price: number;
}

interface CarouselProps {
  items: Book[];
  itemsPerPage: number;
}

export const Carousel: React.FC<CarouselProps> = ({ items, itemsPerPage }) => {
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
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-end pr-4">
        {currentPage} / {totalPages}
      </div>
      <div className="grid grid-cols-5 gap-4 overflow-hidden">
        {items
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-contain"
              />
              <div className="text-center mt-2">{item.title}</div>
              <div className="text-sm text-gray-500">{item.author}</div>
              <div className="text-sm">{item.price.toLocaleString()}원</div>
            </div>
          ))}
      </div>
      {isHovered && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2"
          >
            &#9664;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2"
          >
            &#9654;
          </button>
        </>
      )}
    </div>
  );
};
