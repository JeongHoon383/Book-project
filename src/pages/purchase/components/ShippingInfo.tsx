import React, { useState } from "react";
import { Truck } from "lucide-react";

interface ShippingInfoProps {
  onInputChange: (field: string, value: string) => void;
}

export const ShippingInfo: React.FC<ShippingInfoProps> = ({
  onInputChange,
}) => {
  const [requestText, setRequestText] = useState("");
  const maxChars = 100;

  const handleRequestChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setRequestText(text);
      onInputChange("request", text);
    }
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
            type="text"
            id="name"
            placeholder="이름을 입력하세요"
            className="input-style"
            onChange={(e) => onInputChange("name", e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-1"
            htmlFor="address"
          >
            주소
          </label>
          <input
            type="text"
            id="address"
            placeholder="주소를 입력하세요"
            className="input-style"
            onChange={(e) => onInputChange("address", e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-1"
            htmlFor="phone"
          >
            전화번호
          </label>
          <input
            type="text"
            id="phone"
            placeholder="전화번호를 입력하세요"
            className="input-style"
            onChange={(e) => onInputChange("phone", e.target.value)}
          />
        </div>

        <div className="mb-4 relative">
          <label
            className="block text-gray-700 text-sm font-medium mb-1"
            htmlFor="request"
          >
            요청 사항
          </label>
          <textarea
            id="request"
            placeholder="요청 사항을 입력하세요"
            className="input-style"
            onChange={handleRequestChange}
            value={requestText}
            rows={3} // 기본 높이 설정
            maxLength={maxChars}
            style={{ resize: "none" }} // 크기 조절 핸들러 제거
          />
          <div className="text-sm text-gray-600 absolute bottom-2 right-2">
            <span className="text-black">{requestText.length}</span>
            <span className="text-gray-400">/{maxChars}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
