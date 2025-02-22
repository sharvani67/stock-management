import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import io from "socket.io-client";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSiteCodeOpen, setIsSiteCodeOpen] = useState(false);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [siteCodes, setSiteCodes] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [loadingSites, setLoadingSites] = useState(true);
  const [error, setError] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const siteId = user?.siteId;

  // Initialize Socket.io Connection
 
  const socket = io(`${BASE_URL}`, {
    transports: ["polling", "websocket"]
});


  socket.on("connect", () => {
    console.log("Connected to WebSocket server.");
  });

  socket.on("connect_error", (err) => {
    console.error("WebSocket connection error:", err);
  });

  const toggleNavbar = () => setIsOpen(!isOpen);
  const toggleProfileMenu = () => setIsProfileOpen((prev) => !prev);
  const toggleSiteCode = () => setIsSiteCodeOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (!user?.id) return;

    const fetchSites = async () => {
      setLoadingSites(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/sites`);
        if (!response.ok) throw new Error("Failed to fetch sites");

        const data = await response.json();
        console.log("Fetched sites:", data);
        setSiteCodes(data.filter((site) => site.userId === user.id));
      } catch (error) {
        console.error("Error fetching sites:", error);
        setError(error.message);
      } finally {
        setLoadingSites(false);
      }
    };

    fetchSites();
  }, [user?.id]);

  useEffect(() => {
    if (!siteId) return;
  
    socket.on("newNotification", (notification) => {
      if (notification.receiverId === siteId) {
        console.log("New notification received:", notification);
        setNotificationCount((prev) => prev + 1);
      }
    });
  
    return () => {
      socket.off("newNotification");
    };
  }, [siteId]);
  

  const handleClick = () => {
    console.log("Marking notifications as read...");
    fetch(`${BASE_URL}/notifications/mark-read`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ siteId }),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("Notifications marked as read.");
        setNotificationCount(0);
      })
      .catch((error) => console.error("Error marking notifications as read:", error));
  };

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
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/notifications" onClick={handleClick} className={notificationCount > 0 ? "active" : ""}>
            <FaBell /> Notification {notificationCount > 0 && <span>({notificationCount})</span>}
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
                    {loadingSites ? (
                      <p>Loading site codes...</p>
                    ) : error ? (
                      <p className="error-message">{error}</p>
                    ) : siteCodes.length > 0 ? (
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
