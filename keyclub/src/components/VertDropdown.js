import React, { useState } from "react";
import "../styles/VertDropdown.css";

const VertDropdown = ({ children, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <li
        className={isOpen ? "vert-dropdown-btn active" : "vert-dropdown-btn"}
        onClick={() => handleOpen()}
      >
        {name}
      </li>
      <li
        className={
          isOpen ? "vert-dropdown-content active" : "vert-dropdown-content"
        }
      >
        {children}
      </li>
    </>
  );
};

export default VertDropdown;
