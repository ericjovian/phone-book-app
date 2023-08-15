import React from "react";
import { css } from "@emotion/react";

interface ContactProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const Contact: React.FC<ContactProps> = ({
  firstName,
  lastName,
  phoneNumber,
}) => {
  const ContactCardStyling = css`
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    height: 100px;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `;

  return (
    <div css={ContactCardStyling}>
      <h1>
        {firstName} {lastName}
      </h1>
      <h1> {phoneNumber} </h1>
    </div>
  );
};

export default Contact;
