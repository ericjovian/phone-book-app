import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
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
      <button onClick={handleBack} css={buttonStyling}>
        &lt; Back
      </button>
    </div>
  );
};

export default BackButton;
