import * as React from "react";
import { pageRoutes } from "@/apiRoutes";
import { IProduct } from "@/lib/product/types";
import { useNavigate } from "react-router-dom";
import { CartTextButton } from "@/pages/common/components/CartTextButton";
import { OrderTextButton } from "@/pages/common/components/OrderTextButton";

interface ProductManageListProps {
  product: IProduct;
  onToggleSelect: () => void;
  isSelected: boolean;
  onClickAddCartButton: (
    e: React.MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) => void;
  onClickAddOrderButton: () => void;
  onClickViewCart: () => void;
}

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
        ref={ref}
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
                className="w-[50px] h-[50px] md:w-[150px] md:h-[150px] cursor-pointer"
                onClick={handleNavigate}
              >
                <picture>
                  <source srcSet={image.webp} type="image/webp" />
                  <source srcSet={image.original} type="image/jpeg" />
                  <img
                    src={image.original}
                    className="w-full h-full object-contain"
                  />
                </picture>
              </div>
            </div>
            <div className="max-w-[500px] flex flex-col justify-center gap-3">
              <div
                onClick={handleNavigate}
                className="cursor-pointer font-bold hover:underline overflow-hidden text-ellipsis whitespace-normal line-clamp-1"
              >
                {title}
              </div>
              <div className="text-info">
                {author} | {publishedDate}
              </div>
              <div className="flex gap-2 items-center">
                <div className="font-bold text-title">10%</div>
                <div className="font-bold ">{price.toLocaleString()}원</div>
                <div className="text-gray-400 line-through">
                  {Math.round(price * 1.1).toLocaleString()}원
                </div>
              </div>
              <div className="overflow-hidden text-ellipsis whitespace-normal line-clamp-2 text-info">
                {description}
              </div>
            </div>
          </div>
          <div className="basis-1/6 flex flex-col justify-center gap-3">
            <CartTextButton
              onClickAdd={handleClickAddCartButton}
              onClickView={onClickViewCart}
              id={id}
            />
            <OrderTextButton onClick={onClickAddOrderButton} id={id} />
          </div>
        </div>
      </div>
    );
  }
);

HomeProductItem.displayName = "HomeProductItem";
