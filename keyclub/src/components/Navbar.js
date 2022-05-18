import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimension";
import "../styles/Navbar.css";
import Dropdown from "./Dropdown";
import NavButton from "./NavButton";
import VertDropdown from "./VertDropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
    window.addEventListener("click", (e) => {
      if (e.target.id === "overlay") setIsOpen(false);
    });
  }, []);

  const { width } = useWindowDimensions();

  return (
    <>
      {width >= 950 ? (
        <ul className="navbar">
          <li className="logo">
            <h1 className="head">Bonanza Keyclub</h1>
          </li>
          <div className="buttons">
            <NavButton to="/" name="Home" />
            <NavButton to="/events" name="Events" />
            <NavButton to="/polls" name="Polls" />
            <Dropdown name="Resources">
              <a href="#">Handbook</a>
              <a href="#">Newsletter Template</a>
              <a href="#">Sponsorship Toolkit</a>
            </Dropdown>
          </div>
        </ul>
      ) : (
        <>
          <div className="vert-header">
            <FontAwesomeIcon
              icon={faBars}
              size="2xl"
              style={{ paddingLeft: 25, color: "white", zIndex: 100 }}
              onClick={() => setIsOpen(true)}
            />
            <div className="vert-title">Bonanza Keyclub</div>
          </div>
          <ul className={isOpen ? "vert-navbar active" : "vert-navbar"}>
            <NavButton to="/" name="Home" />
            <NavButton to="/events" name="Events" />
            <NavButton to="/polls" name="Polls" />
            <VertDropdown name="Resources">
              <a href="#">Handbook</a>
              <a href="#">Newsletter Template</a>
              <a href="#">Sponsorship Toolkit</a>
            </VertDropdown>
          </ul>
          <div id="overlay" className={isOpen ? "overlay" : null}></div>
        </>
      )}
    </>
  );
};

export default Navbar;
