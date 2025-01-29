import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [siteCodes, setSiteCodes] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const { user, logout } = useContext(AuthContext);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);
  const toggleSiteCode = () => setIsSiteCodeOpen(!isSiteCodeOpen);
  const navigate = useNavigate(); // Initialize the navigate function

  // logout function
  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/"); // Redirect to the login page
  };

  // Fetch Site Codes when the component mounts or when the user changes
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch(`http://localhost:5000/sites`);
        if (response.ok) {
          const data = await response.json();
          const filteredSites = data.filter((site) => site.userId === user?.id);
          setSiteCodes(filteredSites);
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

  // Fetch User Details when "My Profile" is clicked
  const fetchUserDetails = async () => {
    if (!isUserDetailsOpen) {
      try {
        const response = await fetch(`http://localhost:5000/users`);
        if (response.ok) {
          const data = await response.json();
          const userDetail = data.find((userItem) => userItem.id === user.id);
          setUserDetails(userDetail);
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

      <div className="navbar-profile">
        <div className="profile-icon" onClick={toggleProfileMenu}>
          <FaUserCircle />
          <span>Profile</span>
        </div>

        {isProfileOpen && (
          <div className="profile-dropdown">
            <ul>
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

              <li>
      <button onClick={handleLogout} className="dropdown-button">
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
