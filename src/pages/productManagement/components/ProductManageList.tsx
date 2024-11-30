import * as React from "react";
import { IProduct } from "@/lib/product/types";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";

interface ProductManageListProps {
  product: IProduct;
  onToggleSelect: () => void;
  isSelected: boolean;
}

export const ProductManageList = React.forwardRef<
  HTMLTableRowElement,
  ProductManageListProps
>(({ product, onToggleSelect, isSelected }, ref) => {
  const {
    id,
    author,
    category,
    description,
    image,
    price,
    publishedDate,
    stock,
    title,
  } = product;

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`${pageRoutes.productDetail}/${id}`);
  };

  return (
    <>
      <tr
        ref={ref}
        className="text-center text-xs border-b border-borderGray py-10"
      >
        <td className="p-2">
          <input
            type="checkbox"
            aria-label="개별 항목 선택"
            checked={isSelected}
            onChange={onToggleSelect}
          />
        </td>
        <td className="p-2 flex items-center md:space-x-4 text-left py-6">
          <picture className="w-24 h-24 hidden md:table-cell">
            <source srcSet={image.webp} type="image/webp" />
            <source srcSet={image.original} type="image/jpeg" />
            <img
              src={image.original}
              className="w-full h-full object-contain rounded cursor-pointer"
              onClick={handleNavigate}
            />
          </picture>
          <div className="max-w-[90px] md:min-w-[300px]">
            <div className="flex flex-col justify-center max-w-[300px] h-full gap-2">
              <div
                className="font-bold text-xs overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer hover:underline"
                onClick={handleNavigate}
              >
                {title}
              </div>
              <div className="text-xs text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                {author} 저 | {publishedDate}
              </div>
              <div className="text-xs text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
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
