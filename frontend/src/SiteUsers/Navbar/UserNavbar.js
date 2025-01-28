import React, { useState, useEffect, useContext } from "react";
import {
  FaHome,
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
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSiteCodeOpen, setIsSiteCodeOpen] = useState(false);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false); // To toggle user details
  const [siteCodes, setSiteCodes] = useState([]);
  const [userDetails, setUserDetails] = useState(null); // To store user details
  const { user, logout } = useContext(AuthContext);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Fetch Site Codes for the user
  const toggleSiteCode = async () => {
    if (!isSiteCodeOpen) {
      try {
        const response = await fetch(`http://localhost:5000/sites?userId=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setSiteCodes(data);
        } else {
          console.error("Failed to fetch site codes");
        }
      } catch (error) {
        console.error("Error fetching site codes:", error);
      }
    }
    setIsSiteCodeOpen(!isSiteCodeOpen);
  };

  // Fetch User Details when My Profile is clicked
  const fetchUserDetails = async () => {
    if (!isUserDetailsOpen) {
      try {
        const response = await fetch(`http://localhost:5000/users`);
        if (response.ok) {
          const data = await response.json();
          const userDetail = data.find((userItem) => userItem.id === user.id); // Find user by id
          setUserDetails(userDetail); // Set user details to state
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
    setIsUserDetailsOpen(!isUserDetailsOpen);
  };

  return (
    <nav className="navbar">
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
        <li>
          <Link to="/allocatedtable">
            <FaBoxOpen />
            Allocated Table
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
              {/* Site Code Section */}
              <li>
                <button className="dropdown-button" onClick={toggleSiteCode}>
                  <FaCode />
                  Site Code {isSiteCodeOpen ? "▲" : "▼"}
                </button>
                {isSiteCodeOpen && (
                  <div className="dropdown-content">
                    {siteCodes.length > 0 ? (
                      <ul>
                        {siteCodes.map((site) => (
                          <li key={site.id}>
                            <strong>Code:</strong> {site.siteCode} |{" "}
                            <strong>Location:</strong> {site.location}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No site codes available.</p>
                    )}
                  </div>
                )}
              </li>

              {/* My Profile Section */}
              <li>
                <button className="dropdown-button" onClick={fetchUserDetails}>
                  <FaUserAlt />
                  My Profile {isUserDetailsOpen ? "▲" : "▼"}
                </button>
                {isUserDetailsOpen && userDetails && (
                  <div className="dropdown-content">
                    <p>
                      <strong>Name:</strong> {userDetails.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {userDetails.email}
                    </p>
                    <p>
                      <strong>Role:</strong> {userDetails.role}
                    </p>
                  </div>
                )}
              </li>

              {/* Logout Section */}
              <li>
                <button onClick={logout} className="dropdown-button">
                  <FaSignOutAlt />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;
