import React from "react";
import { Building, CreditCard, Smartphone, Wallet } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { CartItem } from "@/store/cart/types";

interface PaymentInfoProps {
  product: CartItem | CartItem[] | null;
  totalPrice: number;
  isDirectPurchase: boolean;
}

export const PaymentInfo: React.FC<PaymentInfoProps> = ({
  product,
  totalPrice,
  isDirectPurchase,
}) => {
  // 로건부 렌더링
  // isDirectPurchase가 true일때 단일 product 데이터 출력
  // isDirectPurchase가 false일때 product[] 데이터 출력
  const { register } = useFormContext();
  // 배송비 계산: 단일 product인 경우 product.price를 기준으로 계산
  // 총 상품 가격 계산: 단일 product인 경우 단일 상품 가격 사용, 배열일 경우 totalPrice 사용
  const productPrice =
    isDirectPurchase && product && !Array.isArray(product)
      ? product.price * product.count
      : totalPrice;

  // 배송비 계산
  const shippingFee = productPrice >= 50000 ? 0 : 3000;

  // 총 결제 금액 계산
  const totalPayment = productPrice + shippingFee;

  return (
    <div className="border border-borderGray rounded-xl shadow-sm">
      <div className="flex items-center p-4 md:p-8 text-lg md:text-2xl font-bold border-b border-borderGray">
        <CreditCard className="mr-2 h-6 w-6" />
        결제 정보
      </div>
      <div className="px-6 pb-6">
        {/* 총 상품 가격 */}
        <div className="flex text-sm md:text-lg gap-12 p-6 border-b border-borderGray">
          <div className="font-bold min-w-[70px]">총 상품 가격</div>
          <div className="min-w-[60px] font-medium">
            {productPrice.toLocaleString()}원
          </div>
        </div>

        {/* 배송비 */}
        <div className="flex text-sm md:text-lg gap-[90px] p-6 border-b border-borderGray">
          <div className="font-bold min-w-[40px]">배송비</div>
          <div className="min-w-[50px] font-medium">
            {shippingFee.toLocaleString()}원
          </div>
        </div>

        {/* 총 결제 금액 */}
        <div className="flex text-sm md:text-lg gap-12 p-6 border-b border-borderGray">
          <div className="font-bold min-w-[70px]">총 결제 금액</div>
          <div className="min-w-[60px] font-medium">
            {totalPayment.toLocaleString()}원
          </div>
        </div>

        {/* 결제 방법 선택 */}
        <div className="flex flex-col md:flex-row items-start text-sm md:text-lg gap-6 px-6 pt-6">
          <div className="flex items-center font-bold">
            <CreditCard className="mr-2 h-4 w-4" />
            결제 방법
          </div>
          <label className="flex items-center font-medium space-x-2">
            <input
              type="radio"
              value="accountTransfer"
              {...register("payment", {
                required: "결제 방법을 선택해 주세요.",
              })}
            />
            <Building className="mr-2 h-4 w-4" />
            <span>계좌이체</span>
          </label>
          <label className="flex items-center font-medium space-x-2">
            <input type="radio" value="creditCard" {...register("payment")} />
            <CreditCard className="mr-2 h-4 w-4" />
            <span>신용/체크카드</span>
          </label>
          <label className="flex items-center font-medium space-x-2">
            <input type="radio" value="phone" {...register("payment")} />
            <Smartphone className="mr-2 h-4 w-4" />
            <span>휴대폰</span>
          </label>
          <label className="flex items-center font-medium space-x-2">
            <input type="radio" value="bankDeposit" {...register("payment")} />
            <Wallet className="mr-2 h-4 w-4" />
            <span>무통장입금</span>
          </label>
        </div>
      </div>
    </div>
  );
};
