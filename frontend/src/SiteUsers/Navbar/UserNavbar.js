import React, { useState,useEffect,useContext   } from "react";

import { FaHome, FaBoxOpen, FaTruck, FaChartPie, FaFileAlt, FaBars,FaUserCircle,FaCode,FaUserAlt,FaSignOutAlt} from "react-icons/fa";
import "./UserNavbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const [sites, setSites] = useState([]);
  
    // Fetch site data based on user ID
    useEffect(() => {
      const fetchSites = async () => {
        try {
          const response = await fetch(`http://localhost:5000/sites?userId=${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setSites(data);
          } else {
            console.error("Failed to fetch sites");
          }
        } catch (error) {
          console.error("Error fetching sites:", error);
        }
      };
  
      if (user?.id) {
        fetchSites();
      }
    }, [user?.id]);


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
            Purchase
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
          <Link to="/allocatedtable">
            <FaBoxOpen />
            StockIn(allocated)
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
