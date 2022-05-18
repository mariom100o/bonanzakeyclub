import React from "react";
import "../styles/Header.css";

const Header = ({ title, img }) => {
  return (
    <div className="header">
      <h1 className="header-text">{title}</h1>
      <img className="header-img" src={img} />
    </div>
  );
};

export default Header;
