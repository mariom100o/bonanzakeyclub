import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/NavButton.css";

const NavButton = ({ to, name }) => {
  return (
    <>
      <li>
        <NavLink
          className={(isActive) =>
            isActive.isActive === true ? "nav-btn active" : "nav-btn"
          }
          to={to}
        >
          {name}
        </NavLink>
      </li>
    </>
  );
};

export default NavButton;
