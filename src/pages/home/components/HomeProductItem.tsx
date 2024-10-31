import * as React from "react";
import { pageRoutes } from "@/apiRoutes";
import { IProduct } from "@/lib/product/types";
import { useNavigate } from "react-router-dom";
import { CartTextButton } from "@/pages/common/components/CartTextButton";

interface ProductManageListProps {
  product: IProduct;
  onToggleSelect: () => void; // 체크박스 선택/해제 핸들러
  isSelected: boolean;
  onClickAddCartButton: (
    e: React.MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) => void;
  onClickViewCart: () => void;
}

// forwardRef를 사용하여 ref를 전달받음
export const HomeProductItem = React.forwardRef<
  HTMLDivElement,
  ProductManageListProps
>(
  (
    {
      product,
      onToggleSelect,
      isSelected,
      onClickAddCartButton,
      onClickViewCart,
    },
    ref
  ) => {
    const navigate = useNavigate();
    const { id, title, author, publishedDate, price, image, description } =
      product;

    const handleNavigate = () => {
      navigate(`${pageRoutes.productDetail}/${id}`);
    };

    const handleClickAddCartButton = (
      e: React.MouseEvent<HTMLButtonElement>
    ): void => {
      e.stopPropagation();
      onClickAddCartButton(e, product);
    };

    return (
      <div
        className="py-5 border-b border-borderGray flex items-center"
        ref={ref} // ref 할당
      >
        <div className="flex basis-4/5 gap-5">
          <div className="flex gap-5">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onToggleSelect}
            />
            <div
              className="w-[200px] h-[200px] cursor-pointer"
              onClick={handleNavigate}
            >
              <img src={image} className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="max-w-[500px] flex flex-col justify-center gap-5">
            <div onClick={handleNavigate} className="cursor-pointer">
              {title}
            </div>
            <div>
              {author} | {publishedDate}
            </div>
            <div>{price.toLocaleString()}원</div>
            <div className="overflow-hidden text-ellipsis whitespace-normal line-clamp-2">
              {description}
            </div>
          </div>
        </div>
        <div className="basis-1/5 flex flex-col gap-5">
          <CartTextButton
            onClickAdd={handleClickAddCartButton} // 장바구니에 추가
            onClickView={onClickViewCart} // 장바구니 보기 모달 열기
            id={id}
          />
          <button className="px-4 py-2 bg-green-500 text-white rounded">
            바로구매
          </button>
        </div>
      </div>
    );
  }
);

HomeProductItem.displayName = "HomeProductItem";
