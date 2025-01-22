// src/Components/Sidebar/Sidebar.js
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './SideBar.css'

function Sidebar() {
  return (
    <div className="sidebar">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <h2>Dashboard</h2>
      </div>

      {/* Toggle Button for Small Screens */}
      <button
        className="sidebar-toggle-btn d-md-none mx-3 mb-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-expanded="false"
        aria-controls="sidebarMenu"
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar Menu */}
      <div id="sidebarMenu" className="sidebar-menu collapse d-md-block">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/users" className="nav-link">
              <i className="fas fa-users"></i> Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/purchase" className="nav-link">
              <i className="fas fa-shopping-cart"></i> Purchases
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add-purchase" className="nav-link">
              <i className="fas fa-plus-circle"></i> Add Purchase
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/site" className="nav-link">
              <i className="fas fa-map-marker-alt"></i> Sites
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">
              <i className="fas fa-cogs"></i> Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/brands" className="nav-link">
              <i className="fas fa-tag"></i> Brands
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/unit" className="nav-link">
              <i className="fas fa-box"></i> Units
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/allocations" className="nav-link">
              <i className="fas fa-archive"></i> Allocations
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/centralstock" className="nav-link">
              <i className="fas fa-database"></i> Central Stock
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/suppliers" className="nav-link">
              <i className="fas fa-truck"></i> Suppliers
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}


export default Sidebar;
