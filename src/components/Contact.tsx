import React from "react";
import { css } from "@emotion/react";
import Detail from "../assets/detail.svg";
import { Link } from "react-router-dom";

interface ContactProps {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  onDetailClick: (id: number) => void;
}

const Contact: React.FC<ContactProps> = ({
  id,
  firstName,
  lastName,
  phoneNumber,
  onDetailClick,
}) => {
  const ContactCardStyling = css`
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    height: 100px;
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `;

  const DetailButtonStyling = css`
    border: none;
    background-color: transparent;
    cursor: pointer;
  `;

  return (
    <div css={ContactCardStyling}>
      <div>
        <h1>
          {firstName} {lastName}
        </h1>
        <h1> {phoneNumber} </h1>
      </div>
      <Link to={`/${id}`}>
        <button css={DetailButtonStyling}>
          <img src={Detail} alt="detail" />
        </button>
      </Link>
    </div>
  );
};

export default Contact;
