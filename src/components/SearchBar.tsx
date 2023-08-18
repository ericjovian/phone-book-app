import React, { useState } from "react";
import { css } from "@emotion/react";
import { useDebounce } from "../hooks/useDebounce";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  };

  // Call the onSearch function with the debounced search term
  React.useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      `}
    >
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        css={css`
          height: 40px;
          width: 90vw;
          border-radius: 5px;
          border: 1px solid #ccc;
          padding: 0 10px;
          margin: 10px 0;
          font-size: 16px;
        `}
      />
    </div>
  );
};

export default SearchBar;
