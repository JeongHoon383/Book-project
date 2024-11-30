import React from "react";
import { Building, CreditCard, Smartphone, Wallet } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { CartItem } from "@/store/cart/types";

interface PaymentInfoProps {
  product: CartItem[] | null;
}

export const PaymentInfo: React.FC<PaymentInfoProps> = ({ product }) => {
  const { register } = useFormContext();

  const totalProductPrice = product?.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const shippingFee = totalProductPrice! >= 50000 ? 0 : 3000;

  const totalPayment = totalProductPrice! + shippingFee;

  return (
    <div className="border border-borderGray rounded-xl shadow-sm">
      <div className="flex gap-2 items-center p-4 text-base font-bold border-b border-borderGray">
        <CreditCard className="w-4 h-4" />
        결제 정보
      </div>
      <div className="text-xs">
        <div className="flex text-sm justify-between p-3 md:px-6 font-bold border-b border-borderGray">
          <div>총 상품 가격</div>
          <div>{totalProductPrice?.toLocaleString()}원</div>
        </div>

        <div className="flex text-sm justify-between md:gap-[89px] p-3 md:px-6 font-bold border-b border-borderGray">
          <div>배송비</div>
          <div>{shippingFee.toLocaleString()}원</div>
        </div>

        <div className="flex text-sm justify-between md:gap-20 p-3 md:px-6 font-bold border-b border-borderGray">
          <div>총 결제 금액</div>
          <div>{totalPayment.toLocaleString()}원</div>
        </div>

        <div className="flex flex-col md:flex-row items-start text-sm gap-4 p-4">
          <div className="flex gap-2 items-center font-bold">
            <CreditCard className="h-4 w-4" />
            결제 방법
          </div>
          <label className="flex items-center font-medium gap-2">
            <input
              type="radio"
              value="accountTransfer"
              {...register("payment", {
                required: "결제 방법을 선택해 주세요.",
              })}
            />
            <Building className="h-4 w-4" />
            <span>계좌이체</span>
          </label>
          <label className="flex items-center font-medium gap-2">
            <input type="radio" value="creditCard" {...register("payment")} />
            <CreditCard className="h-4 w-4" />
            <span>신용/체크카드</span>
          </label>
          <label className="flex items-center font-medium gap-2">
            <input type="radio" value="phone" {...register("payment")} />
            <Smartphone className="h-4 w-4" />
            <span>휴대폰</span>
          </label>
          <label className="flex items-center font-medium gap-2">
            <input type="radio" value="bankDeposit" {...register("payment")} />
            <Wallet className="h-4 w-4" />
            <span>무통장입금</span>
          </label>
        </div>
      </div>
    </div>
  );
};
