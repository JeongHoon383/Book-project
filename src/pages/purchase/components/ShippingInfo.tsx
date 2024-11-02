import React, { useState } from "react";
import { Truck } from "lucide-react";
import { useFormContext } from "react-hook-form";

export const ShippingInfo: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const maxChars = 100;
  const [currentChars, setCurrentChars] = useState(0);

  const handleRequestChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentChars(e.target.value.length);
  };

  return (
    <div className="border border-borderGray rounded-xl shadow-sm">
      <div className="flex items-center p-4 md:p-8 text-lg md:text-2xl font-bold border-b border-borderGray">
        <Truck className="mr-2 h-6 w-6" />
        배송 정보
      </div>
      <div className="p-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-1"
            htmlFor="name"
          >
            이름
          </label>
          <input
            {...register("name", { required: "이름을 입력하세요" })}
            type="text"
            id="name"
            placeholder="이름을 입력하세요"
            className="input-style"
          />
          {errors.name && typeof errors.name.message === "string" && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-1"
            htmlFor="address"
          >
            주소
          </label>
          <input
            {...register("address", { required: "주소를 입력하세요" })}
            type="text"
            id="address"
            placeholder="주소를 입력하세요"
            className="input-style"
          />
          {errors.address && typeof errors.address.message === "string" && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-1"
            htmlFor="phone"
          >
            전화번호
          </label>
          <input
            {...register("phone", {
              required: "전화번호를 입력하세요",
              pattern: {
                value: /^[0-9]+$/,
                message: "유효한 전화번호를 입력하세요",
              },
            })}
            type="text"
            id="phone"
            placeholder="전화번호를 입력하세요"
            className="input-style"
          />
          {errors.phone && typeof errors.phone.message === "string" && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <label
            className="block text-gray-700 text-sm font-medium mb-1"
            htmlFor="request"
          >
            요청 사항
          </label>
          <textarea
            {...register("requests", {
              maxLength: {
                value: maxChars,
                message: `최대 ${maxChars}자까지 입력 가능합니다.`,
              },
            })}
            id="request"
            placeholder="요청 사항을 입력하세요"
            className="input-style"
            rows={3} // 기본 높이 설정
            style={{ resize: "none" }} // 크기 조절 핸들러 제거
            onChange={(e) => {
              handleRequestChange(e);
              register("requests").onChange(e); // react-hook-form과의 연결 유지
            }}
          />
          <div className="text-sm text-gray-600 absolute bottom-2 right-2">
            <span className="text-black">{currentChars}</span>
            <span className="text-gray-400">/{maxChars}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
