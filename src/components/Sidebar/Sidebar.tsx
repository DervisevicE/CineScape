import React, { useState, useEffect } from "react";
import "./sidebar.css";
import Logo from "../../assets/logo-white.png";
import More from "../../assets/more.png";

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
        <div className="logo-container">
          <img src={Logo} alt="logo" className="logo" />
          <p className="title">
            <strong>Cine</strong>Scape
          </p>
        </div>
        <div className="options-container">
          <div className="option">Home</div>
          <div className="option">Trending</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
