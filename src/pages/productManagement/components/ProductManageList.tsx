import * as React from "react";
import { IProduct } from "@/lib/product/types";

interface ProductManageListProps {
  product: IProduct;
  onToggleSelect: () => void; // 체크박스 선택/해제 핸들러
  isSelected: boolean;
}

export const ProductManageList = React.forwardRef<
  HTMLTableRowElement,
  ProductManageListProps
>(({ product, onToggleSelect, isSelected }, ref) => {
  const {
    author,
    category,
    description,
    image,
    price,
    publishedDate,
    stock,
    title,
  } = product;

  console.log(image);

  return (
    <>
      <tr
        ref={ref}
        className="text-center text-sm md:text-base border-b border-borderGray py-10"
      >
        <td className="p-2">
          <input
            type="checkbox"
            aria-label="개별 항목 선택"
            checked={isSelected}
            onChange={onToggleSelect}
          />
        </td>
        <td className="p-2 flex items-center space-x-1 md:space-x-4 text-left py-10">
          <img
            src={image.webp}
            className="w-8 h-8 md:w-24 md:h-24 object-contain rounded hidden md:table-cell"
          />
          <div className="max-w-[90px] md:min-w-[300px]">
            <div className="flex flex-col justify-center max-w-[300px] h-full gap-2">
              <div className="font-bold text-sm md:text-base overflow-hidden text-ellipsis whitespace-nowrap">
                {title}
              </div>
              <div className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                {author} 저 | {publishedDate}
              </div>
              <div className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                {description}
              </div>
            </div>
          </div>
        </td>
        <td className="p-2 min-w-[75px]">{price.toLocaleString()}원</td>
        <td className="p-2 hidden md:table-cell">{category.name}</td>
        <td className="p-2 min-w-[65px]">판매완료</td>
        <td className="p-2 hidden md:table-cell">{stock}</td>
        <td className="p-2 hidden md:table-cell">
          {product.createdAt
            ? new Date(product.createdAt).toLocaleDateString().slice(0, -1)
            : "-"}
        </td>
        <td className="p-2 hidden md:table-cell">
          {product.updatedAt
            ? new Date(product.updatedAt).toLocaleDateString().slice(0, -1)
            : "-"}
        </td>
      </tr>
    </>
  );
});

ProductManageList.displayName = "ProductManageList";
