import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Dropdown.css";

const Dropdown = ({ to, name, children }) => {
  return (
    <>
      <div className="dropdown">
        {to ? (
          <NavLink
            className={(isActive) =>
              isActive.isActive === true ? "dropbtn active" : "dropbtn"
            }
            to={to}
          >
            {name}
          </NavLink>
        ) : (
          <button className="dropbtn">{name}</button>
        )}
        <div className="dropdown-content">{children}</div>
      </div>
    </>
  );
};

export default Dropdown;
