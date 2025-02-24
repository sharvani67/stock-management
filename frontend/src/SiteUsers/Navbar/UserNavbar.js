import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import {
  FaHome,
  FaBoxOpen,
  FaTruck,
  FaChartPie,
  FaFileAlt,
  FaBars,
  FaUserCircle,
  FaTachometerAlt,
  FaBell,
  FaCode,
  FaUserAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import "./UserNavbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../ApiService/Api";
import logo from "../../assets/images/MSlogo.jpg";
import io from "socket.io-client";  // Import socket.io client // ✅ Ensure the logo is in the correct folder
const socket = io(BASE_URL);  // Initialize WebSocket connection
const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSiteCodeOpen, setIsSiteCodeOpen] = useState(false);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [siteCodes, setSiteCodes] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Get current URL
  const profileRef = useRef(null);
  const [notificationCount, setNotificationCount] = useState(0);


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

  useEffect(() => {
    if (!user?.id) return;

    const fetchNotificationCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}/notifications/count/${user.id}`);
        if (!response.ok) throw new Error("Failed to fetch notifications");

        const data = await response.json();
        setNotificationCount(data.unreadCount);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotificationCount();
  }, [user?.id]);
  useEffect(() => {
    const socket = io(BASE_URL);

    if (user?.id) {
      socket.emit("joinSite", user.id); // Join room for real-time updates

      socket.on("updateNotificationCount", (count) => {
        setNotificationCount(count);
      });
    }

    return () => socket.disconnect();
  }, [user?.id]);

  const handleMarkNotificationsRead = async () => {
    try {
      await fetch(`${BASE_URL}/notifications/mark-read`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId: user.id }),
      });
      setNotificationCount(0); // Reset count after marking as read
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
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
      <div className="navbar-logo">
        <Link to="">
          <img src={logo} alt="MS Constructions Logo" />
        </Link>
      </div>
      <button className="navbar-toggler" onClick={toggleNavbar}>
        <FaBars />
      </button>

      <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
        <li>
          <Link to="/home" className={location.pathname === "/home" ? "active" : ""}>
            <FaHome />
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/userdashboard"
            className={location.pathname === "/userdashboard" ? "active" : ""}
          >
            <FaTachometerAlt />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/stockintable"
            className={location.pathname === "/stockintable" ? "active" : ""}
          >
            <FaBoxOpen />
            Purchase
          </Link>
        </li>
        <li>
          <Link
            to="/stockout"
            className={location.pathname === "/stockout" ? "active" : ""}
          >
            <FaTruck />
            Stock Out
          </Link>
        </li>
        <li>
          <Link
            to="/stockconsumed"
            className={location.pathname === "/stockconsumed" ? "active" : ""}
          >
            <FaChartPie />
            Stock Consumed
          </Link>
        </li>
        <li>
          <Link
            to="/allocatedtable"
            className={location.pathname === "/allocatedtable" ? "active" : ""}
          >
            <FaBoxOpen />
            StockIn (Allocated)
          </Link>
        </li>
        <li>
          <Link
            to="/summary"
            className={location.pathname === "/summary" ? "active" : ""}
          >
            <FaFileAlt />
            Reports
          </Link>
        </li>
        <li>
          <Link to="/allocatedtable" className={location.pathname === "" ? "active" : ""} onClick={handleMarkNotificationsRead}>
            <FaBell />
             {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
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
                            <p>
                              <strong>Code:</strong> {site.siteCode}
                            </p>
                            <p>
                              <strong>Location:</strong> {site.location}
                            </p>
                            <p>
                              <strong>Site Name:</strong> {site.siteName}
                            </p>
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
