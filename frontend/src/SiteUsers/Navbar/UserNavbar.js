import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import { BASE_URL } from "../../ApiService/Api";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSiteCodeOpen, setIsSiteCodeOpen] = useState(false);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [siteCodes, setSiteCodes] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const profileRef = useRef(null); // Ref for detecting clicks outside

  const toggleNavbar = () => setIsOpen(!isOpen);
  const toggleProfileMenu = () => setIsProfileOpen((prev) => !prev);
  const toggleSiteCode = () => setIsSiteCodeOpen((prev) => !prev);

  // Logout function
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Fetch Site Codes
  useEffect(() => {
    if (!user?.id) return;

    const fetchSites = async () => {
      try {
        const response = await fetch(`${BASE_URL}/sites`);
        if (!response.ok) throw new Error("Failed to fetch sites");

        const data = await response.json();
        setSiteCodes(data.filter((site) => site.userId === user.id));
      } catch (error) {
        console.error("Error fetching sites:", error);
      }
    };

    fetchSites();
  }, [user?.id]);

  // Fetch User Details
  const fetchUserDetails = async () => {
    if (!isUserDetailsOpen) {
      try {
        const response = await fetch(`${BASE_URL}/users`);
        if (!response.ok) throw new Error("Failed to fetch user details");

        const data = await response.json();
        setUserDetails(data.find((userItem) => userItem.id === user.id));
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
    setIsUserDetailsOpen((prev) => !prev);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
        setIsSiteCodeOpen(false);
        setIsUserDetailsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <button className="navbar-toggler" onClick={toggleNavbar}>
        <FaBars />
      </button>

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
            StockIn (Allocated)
          </Link>
        </li>
        <li>
          <Link to="/summary">
            <FaFileAlt />
            Reports
          </Link>
        </li>
      </ul>

      <div className="navbar-profile" ref={profileRef}>
        <div className="profile-icon" onClick={toggleProfileMenu}>
          <FaUserCircle />
          <span>Profile</span>
        </div>

        {isProfileOpen && (
          <div className="profile-dropdown">
            <ul>
              <li>
                <button className="dropdown-button" onClick={toggleSiteCode}>
                  <FaCode /> Site Code {isSiteCodeOpen ? "▲" : "▼"}
                </button>
                {isSiteCodeOpen && (
                  <div className="dropdown-content">
                    {siteCodes.length > 0 ? (
                      <ul>
                        {siteCodes.map((site) => (
                          <li key={site.id}>
                            <p><strong>Code:</strong> {site.siteCode}</p>
                            <p><strong>Location:</strong> {site.location}</p>
                            <p><strong>Site Name:</strong> {site.siteName}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No site codes available.</p>
                    )}
                  </div>
                )}
              </li>

              <li>
                <button className="dropdown-button" onClick={fetchUserDetails}>
                  <FaUserAlt /> My Profile {isUserDetailsOpen ? "▲" : "▼"}
                </button>
                {isUserDetailsOpen && userDetails && (
                  <div className="dropdown-content">
                    <p><strong>Name:</strong> {userDetails.name}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>Role:</strong> {userDetails.role}</p>
                  </div>
                )}
              </li>

              <li>
                <button onClick={handleLogout} className="dropdown-button">
                  <FaSignOutAlt /> Logout
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
