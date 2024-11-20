import { IProduct } from "@/lib/product/types";
import { CartTextButton } from "@/pages/common/components/CartTextButton";
import { OrderTextButton } from "@/pages/common/components/OrderTextButton";
import React from "react";

interface BookMainProps {
  product: IProduct;
  onClickAddCartButton: (
    e: React.MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) => void;
  onClickAddOrderButton: () => void;
  onClickViewCart: () => void;
}

export const BookMain: React.FC<BookMainProps> = ({
  product,
  onClickAddCartButton,
  onClickAddOrderButton,
  onClickViewCart,
}) => {
  const handleClickAddCartButton = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.stopPropagation();
    onClickAddCartButton(e, product);
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-10 pb-10 border-b border-borderGray">
      <div className="w-full md:w-2/5 shadow-2xl">
        <img
          src={product.image.original}
          className="w-full h-full object-contain"
          alt={product.title}
        />
      </div>
      <div className="flex flex-col justify-between gap-10 w-full md:w-3/5 max-w-full">
        <div className="flex flex-col gap-4">
          <div className="text-lg font-semibold">{product.title}</div>
          <div className="text-sm text-info">
            {product.author} | {product.publishedDate}
          </div>
          <div className="text-xl font-bold">
            {product.price.toLocaleString()}원
          </div>
          <div className="text-info">{product.description}</div>
        </div>
        <div className="flex justify-end gap-4">
          <CartTextButton
            onClickAdd={handleClickAddCartButton} // 장바구니에 추가
            onClickView={onClickViewCart}
            id={product.id}
          />
          <OrderTextButton onClick={onClickAddOrderButton} id={product.id} />
        </div>
      </div>
    </div>
  );
};
