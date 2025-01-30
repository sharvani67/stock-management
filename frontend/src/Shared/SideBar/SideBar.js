import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './SideBar.css';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 992);

  // Update sidebar visibility on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 992);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar Toggle Button for Small Screens */}
      <button className="sidebar-toggle-btn d-lg-none" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Container */}
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <Link to="/dashboard" className="nav-link">
            <h2>Dashboard</h2>
          </Link>
        </div>

        <div className="sidebar-menu">
          <ul className="nav flex-column">
            {[
              { path: "/users", icon: "fas fa-users", label: "Users" },
              { path: "/purchase", icon: "fas fa-shopping-cart", label: "Purchases" },
              { path: "/add-purchase", icon: "fas fa-plus-circle", label: "Add Purchase" },
              { path: "/site", icon: "fas fa-map-marker-alt", label: "Sites" },
              { path: "/products", icon: "fas fa-cogs", label: "Products" },
              { path: "/brands", icon: "fas fa-tag", label: "Brands" },
              { path: "/unit", icon: "fas fa-box", label: "Units" },
              { path: "/allocations", icon: "fas fa-archive", label: "Allocations" },
              { path: "/centralstock", icon: "fas fa-database", label: "Central Stock" },
              { path: "/suppliers", icon: "fas fa-truck", label: "Suppliers" },
            ].map((item) => (
              <li className="nav-item" key={item.path}>
                <Link to={item.path} className="nav-link">
                  <i className={item.icon}></i> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay for Small Screens */}
      {isOpen && window.innerWidth < 992 && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}

export default Sidebar;
