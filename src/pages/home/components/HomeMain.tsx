import { categories } from "@/constants";
import { HomeProductList } from "./HomeProductList";
import { useFilterStore } from "@/store/filter/useFilterStore";
import { useState } from "react";
import { ApiErrorBoundary } from "@/pages/common/components/ApiErrorBoundary";

export const HomeMain = () => {
  const setCategoryId = useFilterStore((state) => state.setCategoryId);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    "-1"
  );

  const handleCategoryClick = (categoryId: string) => {
    setCategoryId(categoryId);
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="w-full h-screen">
      <div className="flex relative ml-2">
        {/* 하단 border를 별도의 div로 분리 */}
        <div className="absolute bottom-0 w-full border-b border-black" />

        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`
              cursor-pointer relative
              md:px-10 md:py-5 md:text-base text-sm p-2 
              ${
                selectedCategoryId === category.id
                  ? "font-bold border-t border-l border-r border-black bg-white"
                  : "border-t border-l border-r border-borderGray"
              }
              rounded-t
              ${
                selectedCategoryId === category.id
                  ? "after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[1px] after:bg-white"
                  : ""
              }
            `}
          >
            {category.name}
          </div>
        ))}
      </div>
      <div className="mt-10">
        <ApiErrorBoundary>
          <HomeProductList />
        </ApiErrorBoundary>
      </div>
    </div>
  );
};
