import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTruck,
  FaChartPie,
  FaFileAlt,
  FaBars,
  FaUserCircle,
  FaCode,
  FaUserAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import "./UserNavbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
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

      {/* Profile Section */}
      <div className="navbar-profile">
        <div className="profile-icon" onClick={toggleProfileMenu}>
          <FaUserCircle />
          <span>Profile</span>
        </div>
        {isProfileOpen && (
          <div className="profile-dropdown">
            <ul>
              <li>
                <a href="#">
                  <FaCode />
                  Site Code
                </a>
              </li>
              <li>
                <a href="#">
                  <FaUserAlt />
                  My Profile
                </a>
              </li>
              <li>
                <a href="#">
                  <FaSignOutAlt />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
