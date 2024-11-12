import * as React from "react";
import { pageRoutes } from "@/apiRoutes";
import { IProduct } from "@/lib/product/types";
import { useNavigate } from "react-router-dom";
import { CartTextButton } from "@/pages/common/components/CartTextButton";
import { OrderTextButton } from "@/pages/common/components/OrderTextButton";
// import { usePrefetchProduct } from "@/lib/product/hooks/usePrefetchProduct";

interface ProductManageListProps {
  product: IProduct;
  onToggleSelect: () => void; // 체크박스 선택/해제 핸들러
  isSelected: boolean;
  onClickAddCartButton: (
    e: React.MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) => void;
  onClickAddOrderButton: () => void;
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
      onClickAddOrderButton,
    },
    ref
  ) => {
    const navigate = useNavigate();
    // const prefetchProductData = usePrefetchProduct();
    const { id, title, author, publishedDate, price, image, description } =
      product;

    const handleNavigate = () => {
      console.time("ProductDetail Load Time");
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
        // onMouseEnter={() => prefetchProductData(id)}
        className="py-5 border-b border-borderGray flex items-center"
        ref={ref} // ref 할당
      >
        <div className="w-full flex flex-col md:flex-row justify-between gap-2">
          <div className="flex basis-5/6 gap-1 md:gap-5">
            <div className="flex items-center gap-1 md:gap-5">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={onToggleSelect}
              />
              <div
                className="w-[50px] h-[50px] md:w-[200px] md:h-[200px] cursor-pointer"
                onClick={handleNavigate}
              >
                <img src={image} className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="max-w-[500px] flex flex-col justify-center md:gap-5 gap-3">
              <div
                onClick={handleNavigate}
                className="cursor-pointer text-sm md:text-lg font-bold hover:underline overflow-hidden text-ellipsis whitespace-normal line-clamp-1"
              >
                {title}
              </div>
              <div className="text-info text-sm md:text-base">
                {author} | {publishedDate}
              </div>
              <div className="flex gap-2 items-center">
                <div className="font-bold text-sm md:text-lg text-title">
                  10%
                </div>
                <div className="font-bold text-sm md:text-lg">
                  {price.toLocaleString()}원
                </div>
                <div className="text-gray-400 line-through text-sm md:text-base">
                  {Math.round(price * 1.1).toLocaleString()}원
                </div>
              </div>
              <div className="overflow-hidden text-ellipsis whitespace-normal line-clamp-2 text-info text-sm md:text-base">
                {description}
              </div>
            </div>
          </div>
          <div className="basis-1/6 flex flex-col justify-center gap-3">
            <CartTextButton
              onClickAdd={handleClickAddCartButton} // 장바구니에 추가
              onClickView={onClickViewCart} // 장바구니 보기 모달 열기
              id={id}
            />
            <OrderTextButton onClick={onClickAddOrderButton} />
          </div>
        </div>
      </div>
    );
  }
);

HomeProductItem.displayName = "HomeProductItem";
