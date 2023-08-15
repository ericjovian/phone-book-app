import React from "react";
import { css } from "@emotion/react";

const SearchBar: React.FC = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        css={css`
          height: 40px;
          width: 90vw;
          border-radius: 5px;
          border: 1px solid #ccc;
          padding: 0 10px;
          margin: 10px;
          font-size: 16px;
        `}
      />
    </div>
  );
};

export default SearchBar;