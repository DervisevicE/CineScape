import React, { useRef } from "react";
import "./sidebar.css";
import Logo from "../../assets/logo-white.png";
import More from "../../assets/more.png";
import { Link } from "react-router-dom";
import { useMenuContext } from "../../context/menuContext";

const Sidebar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isOpen, toggleMenu } = useMenuContext();

  return (
    <>
      <div className="hamburger" onClick={toggleMenu}>
        <img src={More} alt="more" />
      </div>
      <div ref={containerRef} className={`container ${isOpen ? "open" : ""}`}>
        <Link className="router-links" to="/">
          <div className="logo-container">
            <img src={Logo} alt="logo" className="logo" />
            <p className="title">
              <strong>Cine</strong>Scape
            </p>
          </div>
        </Link>

        <div className="options-container">
          <Link className="router-links" to="/movies">
            <div className="option">Movies</div>
          </Link>
          <Link className="router-links" to="/tv-shows">
            <div className="option">TV Shows</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
