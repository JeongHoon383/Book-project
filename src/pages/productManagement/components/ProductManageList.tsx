// UI 담당

import { IProduct } from "@/lib/product/types";

interface ProductManageListProps {
  product: IProduct;
  onToggleSelect: () => void; // 체크박스 선택/해제 핸들러
  isSelected: boolean; // 선택 여부
}

export const ProductManageList: React.FC<ProductManageListProps> = ({
  product,
  onToggleSelect,
  isSelected,
}) => {
  return (
    <div className="flex items-center py-10 border-b border-borderGray">
      <div className="flex items-center basis-5/12">
        <div className="w-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
          />
        </div>
        <div className="flex gap-5">
          <div>
            <img src={product.image} className="w-24 h-24 object-cover" />
          </div>
          <div className="min-w-[300px]">
            <div className="flex flex-col justify-center max-w-[300px] h-full gap-2 ">
              <div className="font-bold">{product.title}</div>
              <div className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                {product.author} 저 | {product.publishedDate}
              </div>
              <div className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                {product.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex basis-7/12 justify-between">
        <div className="w-[10%] text-center">
          {new Intl.NumberFormat("ko-KR").format(product.price)}원
        </div>
        <div className="w-[15%] text-center">{product.category.name}</div>
        <div className="w-[10%] text-center">판매중</div>{" "}
        {/* 판매중 넣어야됨 */}
        <div className="w-[5%] text-center">{product.quantity}</div>
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
};
