import { categories } from "@/constants";
import { HomeProductList } from "./HomeProductList";
import { useFilterStore } from "@/store/filter/useFilterStore";

export const HomeMain = () => {
  const setCategoryId = useFilterStore((state) => state.setCategoryId);

  const handleCategoryClick = (categoryId: string) => {
    setCategoryId(categoryId);
  };

  return (
    <div className="basis-4/5 h-screen">
      <div className="flex gap-10 p-5 border-b border-borderGray mb-10">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="cursor-pointer"
          >
            {category.name}
          </div>
        ))}
      </div>
      <div>
        <HomeProductList />
      </div>
    </div>
  );
};
