import React from "react";
import { Building, CreditCard, Smartphone, Wallet } from "lucide-react";

export const PaymentInfo: React.FC = () => {
  const totalProductPrice = 43200; // 예시로 설정한 상품 가격
  const shippingFee = totalProductPrice >= 50000 ? 0 : 3000; // 50,000원 이상 무료 배송
  const totalPrice = totalProductPrice + shippingFee;

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
            {totalProductPrice.toLocaleString()}원
          </div>
        </div>

        {/* 배송비 */}
        <div className="flex text-sm md:text-lg gap-[90px] p-6 border-b border-borderGray">
          <div className="font-bold min-w-[40px]">배송비</div>
          <div className="min-w-[50px] font-medium">
            {shippingFee === 0 ? "무료" : `${shippingFee.toLocaleString()}원`}
          </div>
        </div>

        {/* 총 결제 금액 */}
        <div className="flex text-sm md:text-lg gap-12 p-6 border-b border-borderGray">
          <div className="font-bold min-w-[70px]">총 결제 금액</div>
          <div className="min-w-[60px] font-medium">
            {totalPrice.toLocaleString()}원
          </div>
        </div>

        {/* 결제 방법 선택 */}
        <div className="flex flex-col md:flex-row items-start text-sm md:text-lg gap-6 px-6 pt-6">
          <div className="flex items-center font-bold">
            <CreditCard className="mr-2 h-4 w-4" />
            결제 방법
          </div>
          <label className="flex items-center font-medium space-x-2">
            <input type="radio" name="paymentMethod" value="계좌이체" />
            <Building className="mr-2 h-4 w-4" />
            <span>계좌이체</span>
          </label>
          <label className="flex items-center font-medium space-x-2">
            <input type="radio" name="paymentMethod" value="신용/체크카드" />
            <CreditCard className="mr-2 h-4 w-4" />
            <span>신용/체크카드</span>
          </label>
          <label className="flex items-center font-medium space-x-2">
            <input type="radio" name="paymentMethod" value="휴대폰" />
            <Smartphone className="mr-2 h-4 w-4" />
            <span>휴대폰</span>
          </label>
          <label className="flex items-center font-medium space-x-2">
            <input type="radio" name="paymentMethod" value="무통장입금" />
            <Wallet className="mr-2 h-4 w-4" />
            <span>무통장입금</span>
          </label>
        </div>
      </div>
      {/* 주문하기 버튼 */}
    </div>
  );
};
