import * as React from "react";
import { IProduct } from "@/lib/product/types";

interface ProductManageListProps {
  product: IProduct;
  onToggleSelect: () => void; // 체크박스 선택/해제 핸들러
  isSelected: boolean;
}

export const ProductManageList = React.forwardRef<
  HTMLDivElement,
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

  return (
    <div
      className="flex items-center py-10 border-b border-borderGray"
      ref={ref}
    >
      <div className="flex items-center basis-5/12">
        <div className="w-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
          />
        </div>
        <div className="flex gap-5">
          <div className="w-[100px] h-[100px]">
            <img src={image} className="w-full h-full object-contain" />
          </div>
          <div className="min-w-[300px]">
            <div className="flex flex-col justify-center max-w-[300px] h-full gap-2 ">
              <div className="font-bold">{title}</div>
              <div className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                {author} 저 | {publishedDate}
              </div>
              <div className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                {description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex basis-7/12 justify-between">
        <div className="w-[10%] text-center">{price.toLocaleString()}원</div>
        <div className="w-[15%] text-center">{category.name}</div>
        <div className="w-[10%] text-center">판매중</div>{" "}
        {/* 판매중 넣어야됨 */}
        <div className="w-[5%] text-center">{stock}</div>
        <div className="w-[15%] text-center">
          {product.createdAt
            ? new Date(product.createdAt).toLocaleDateString().slice(0, -1)
            : "-"}
        </div>
        <div className="w-[15%] text-center">
          {product.updatedAt
            ? new Date(product.updatedAt).toLocaleDateString().slice(0, -1)
            : "-"}
        </div>
      </div>
    </div>
  );
});

ProductManageList.displayName = "ProductManageList";
