import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTruck,
  FaChartPie,
  FaFileAlt,
  FaBars,
} from "react-icons/fa";
import "./UserNavbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <FaTachometerAlt />
        Dashboard
      </div>

      {/* Toggler Button */}
      <button className="navbar-toggler" onClick={toggleNavbar}>
        <FaBars />
      </button>

      {/* Navigation Links */}
      <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
        <li>
          <a href="#">
            <FaBoxOpen />
            Stock In
          </a>
        </li>
        <li>
          <a href="#">
            <FaTruck />
            Stock Out
          </a>
        </li>
        <li>
          <a href="#">
            <FaChartPie />
            Stock Consumed
          </a>
        </li>
        <li>
          <a href="#">
            <FaFileAlt />
            Reports
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
