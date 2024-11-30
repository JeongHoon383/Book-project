import { categories } from "@/constants";
import { HomeProductList } from "./HomeProductList";
import { useFilterStore } from "@/store/filter/useFilterStore";
import { useState } from "react";
import { ApiErrorBoundary } from "@/pages/common/components/ApiErrorBoundary";
import { usePageTitle } from "@/hooks/usePageTitle";

export const HomeMain = () => {
  const setCategoryId = useFilterStore((state) => state.setCategoryId);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    "-1"
  );

  const DEFAULT_TITLE = "경향문고 | 당신의 책을 만나는 곳";

  const getCategoryName = (categoryId: string | null) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.id === "-1"
      ? DEFAULT_TITLE
      : `${category?.name} - 경향문고`;
  };

  usePageTitle(getCategoryName(selectedCategoryId));

  const handleCategoryClick = (categoryId: string) => {
    setCategoryId(categoryId);
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="w-full h-screen">
      <div className="flex relative">
        <div className="absolute bottom-0 w-full border-b border-black" />

        {categories.map((category, index) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`
              cursor-pointer relative
              md:px-6 md:py-4 text-sm md:text-xs py-2.5 px-[11.75px]
              ${
                selectedCategoryId === category.id
                  ? "font-bold border-t border-l border-r border-black bg-white"
                  : "border-t border-r border-borderGray"
              }
              rounded-t
              ${index === 0 ? "border-l border-black" : ""}
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
