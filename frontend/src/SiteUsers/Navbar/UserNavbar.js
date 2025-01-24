import React, { useState } from "react";
import { FaHome, FaBoxOpen, FaTruck, FaChartPie, FaFileAlt, FaBars } from "react-icons/fa";
import "./UserNavbar.css";
import { Link } from "react-router-dom";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className={`navbar-links ${isOpen ? "active" : ""}`}>
      <Link to="/userdashboard">
            <FaHome />
          </Link>
      </div>

      {/* Toggler Button */}
      <button className="navbar-toggler" onClick={toggleNavbar}>
        <FaBars />
      </button>

      {/* Navigation Links */}
      <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
        <li>
          <Link to="/stockintable">
            <FaBoxOpen />
            Stock In
          </Link>
        </li>
        <li>
          <Link to="/stockout">
            <FaTruck />
            Stock Out
          </Link>
        </li>
        <li>
          <Link to="/stockconsumed">
            <FaChartPie />
            Stock Consumed
          </Link>
        </li>
        <li>
          <Link to="/summary">
            <FaFileAlt />
            Reports
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
