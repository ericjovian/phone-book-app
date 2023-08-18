import React from "react";

interface AddFavouriteProps {
  onClick: () => void;
}

const AddFavourite: React.FC<AddFavouriteProps> = ({ onClick }) => {
  const buttonStyling = {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "1rem",

    "&:hover": {
      scale: "1.1",
    },
  };
  return (
    <div>
      <button css={buttonStyling} onClick={onClick}>
        &#9733; Add to Favourite
      </button>
    </div>
  );
};

export default AddFavourite;
