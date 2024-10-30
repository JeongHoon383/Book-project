import { IProduct } from "@/lib/product/types";
import React from "react";

interface BookMainProps {
  product: IProduct;
}

export const BookMain: React.FC<BookMainProps> = ({ product }) => {
  return (
    <div className="flex flex-col md:flex-row h-full gap-10 pb-10 border-b border-borderGray">
      <div className="w-full h-full md:w-2/5">
        <img
          src={product.image}
          className="w-full h-full object-contain"
          alt={product.title}
        />
      </div>
      <div className="flex flex-col justify-between gap-10 w-full md:w-3/5 max-w-full">
        <div className="flex flex-col gap-4">
          <div className="text-lg font-semibold">{product.title}</div>
          <div className="text-sm text-gray-700">
            {product.author} | {product.publishedDate}
          </div>
          <div className="text-xl font-bold">
            {product.price.toLocaleString()}원
          </div>
          <div className="text-gray-600">{product.description}</div>
        </div>
        <div className="flex justify-end gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            장바구니
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded">
            바로구매
          </button>
        </div>
      </div>
    </div>
  );
};
