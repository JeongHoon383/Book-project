import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  setSortOption: (value: string) => void;
}

const options: Option[] = [
  { label: "최신순", value: "latest" },
  { label: "가격 낮은순", value: "priceLow" },
  { label: "가격 높은순", value: "priceHigh" },
];

const CustomSelect: React.FC<CustomSelectProps> = ({ setSortOption }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    setSortOption(option.value);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-36">
      <button
        onClick={toggleDropdown}
        className="w-full flex justify-between gap-1 items-center p-2 text-sm md:text-base font-medium border border-gray-300 rounded-lg"
      >
        {selectedOption ? selectedOption.label : "정렬 기준 선택"}
        <ChevronDown className="w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 border border-gray-300 bg-white rounded-lg shadow-md z-10">
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
