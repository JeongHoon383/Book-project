import { useFilterStore } from "@/store/filter/useFilterStore";
import { Search } from "lucide-react";
import React, { useState } from "react";

export const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const { setSearchTerm } = useFilterStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="hidden text-xs md:flex items-center border border-gray-300 w-[400px] h-[20px] rounded-[25px] p-5">
      <input
        type="text"
        value={searchInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="검색어를 입력하세요"
        className="flex-grow outline-none"
      />
      <button
        onClick={handleSearch}
        className="ml-2 text-gray-500 hover:text-gray-700"
      >
        <Search className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SearchBar;
