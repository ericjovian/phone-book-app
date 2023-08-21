import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import PhoneBook from "../assets/phonebook.svg";
import AddNew from "../assets/addnew.svg";

import { css } from "@emotion/react";

const Navbar: React.FC = () => {
  const NavlinkStyle = css`
    border: none;
    background-color: transparent;
    cursor: pointer;
    width: 50px;
    &:hover {
      scale: 1.1;
    }
    &:active {
      scale: 0.9;
    }
  `;

  const IconStyling = css`
    width: 40px;
    height: 40px;
  `;

  return (
    <>
      <div
        css={css`
          padding-bottom: 6rem;
        `}
      >
        <Outlet />
      </div>
      <div
        css={css`
          display: flex;
          justify-content: space-around;
          align-items: center;
          background-color: #3d5af1;
          padding: 1rem;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
        `}
      >
        <NavLink to="/" css={NavlinkStyle}>
          <img src={PhoneBook} alt="List" css={IconStyling} />
        </NavLink>
        <NavLink to="/0" css={NavlinkStyle}>
          <img src={AddNew} alt="Add" css={IconStyling} />
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
