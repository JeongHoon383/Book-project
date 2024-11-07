import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

const options: Option[] = [
  { label: "최신순", value: "latest" },
  { label: "가격 낮은순", value: "price-low" },
  { label: "가격 높은순", value: "price-high" },
];

const CustomSelect: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-36">
      <button
        onClick={toggleDropdown}
        className="flex justify-between items-center w-full p-2 border border-gray-300 rounded text-left"
      >
        {selectedOption ? selectedOption.label : "정렬 기준 선택"}
        <ChevronDown className="w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 border border-gray-300 bg-white rounded shadow-md z-10">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
