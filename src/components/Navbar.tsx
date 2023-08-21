import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { css } from "@emotion/react";

const Navbar: React.FC = () => {
  const NavlinkStyle = css`
    color: #fff;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: bold;
    &:hover {
      color: #ccc;
    }
    &.active {
      color: #ccc;
    }
  `;

  return (
    <>
      <div
        css={css`
          padding-bottom: 4rem;
        `}
      >
        <Outlet />
      </div>
      <div
        css={css`
          display: flex;
          justify-content: space-around;
          align-items: center;
          background-color: #333;
          padding: 1rem;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
        `}
      >
        <NavLink to="/" css={NavlinkStyle}>
          List
        </NavLink>
        <NavLink to="/0" css={NavlinkStyle}>
          Add
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
