import React, { useState } from "react";

import { FaHome, FaBoxOpen, FaTruck, FaChartPie, FaFileAlt, FaBars,FaUserCircle,FaCode,FaUserAlt,FaSignOutAlt} from "react-icons/fa";
import "./UserNavbar.css";
import { Link } from "react-router-dom";

const UserNavbar = () => {
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
      {/* <div className={`navbar-links ${isOpen ? "active" : ""}`}>
      <Link to="/userdashboard">
            <FaHome />
          </Link>
      </div> */}

      {/* Toggler Button */}
      <button className="navbar-toggler" onClick={toggleNavbar}>
        <FaBars />
      </button>

      {/* Navigation Links */}
      <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
        <li>
        <Link to="/userdashboard">
            <FaHome />
            Dashboard
          </Link>
        </li>
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

export default UserNavbar;
