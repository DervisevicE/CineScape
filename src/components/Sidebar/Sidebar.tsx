import React, { useState, useEffect } from "react";
import "./sidebar.css";
import Logo from "../../assets/logo-white.png";
import More from "../../assets/more.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="hamburger" onClick={toggleSidebar}>
        <img src={More} alt="more" />
      </div>
      <div className={`container ${isOpen ? "open" : ""}`}>
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
