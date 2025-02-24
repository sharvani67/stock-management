import { Link,useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FiLogOut, FiUsers } from "react-icons/fi"; // Import icons
import { MdLocationOn } from "react-icons/md"; // Icon for sites
import "bootstrap/dist/css/bootstrap.min.css";
import "../Navbar/AdminNavbar.css"; // Import custom styles
import logo from "../../assets/images/MSlogo.jpg"; // Import your logo (place in `src/assets/`)

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
   // Logout function
   const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark adminnavbar">
      <div className="container-fluid">
        
        {/* 🌟 Logo + Brand */}
        <Link to="/adminhome" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="Admin Logo" className="adminnavbar-logo" />
          <span className="adminnavbar-brand">Admin Panel</span>
        </Link>

        {/* Toggler button with animation */}
        <button
          className={`navbar-toggler adminnavbar-toggler ${isOpen ? "adminnavbar-toggler-rotate" : ""}`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto adminnavbar-nav">
            
            {/* Users */}
            <li className="nav-item">
              <Link to="/users" className="nav-link adminnavbar-link">
                <FiUsers className="adminnavbar-icon" /> Users
              </Link>
            </li>
            
            {/* Sites */}
            <li className="nav-item">
              <Link to="/site" className="nav-link adminnavbar-link">
                <MdLocationOn className="adminnavbar-icon" /> Sites
              </Link>
            </li>
            
            {/* Logout */}
            <li className="nav-item">
              <button className="btn adminnavbar-logout-btn"onClick={handleLogout}>
                <FiLogOut className="adminnavbar-logout-icon" /> Logout
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
