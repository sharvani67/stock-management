import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./SideBar.css";

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
              <i className="fas fa-users"></i>
              <span className="d-none d-md-inline"> Users</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/purchase" className="nav-link">
              <i className="fas fa-shopping-cart"></i>
              <span className="d-none d-md-inline"> Purchases</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add-purchase" className="nav-link">
              <i className="fas fa-plus-circle"></i>
              <span className="d-none d-md-inline"> Add Purchase</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/site" className="nav-link">
              <i className="fas fa-map-marker-alt"></i>
              <span className="d-none d-md-inline"> Sites</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">
              <i className="fas fa-cogs"></i>
              <span className="d-none d-md-inline"> Products</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/brands" className="nav-link">
              <i className="fas fa-tag"></i>
              <span className="d-none d-md-inline"> Brands</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/unit" className="nav-link">
              <i className="fas fa-box"></i>
              <span className="d-none d-md-inline"> Units</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/allocations" className="nav-link">
              <i className="fas fa-archive"></i>
              <span className="d-none d-md-inline"> Allocations</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/centralstock" className="nav-link">
              <i className="fas fa-database"></i>
              <span className="d-none d-md-inline"> Central Stock</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/suppliers" className="nav-link">
              <i className="fas fa-truck"></i>
              <span className="d-none d-md-inline"> Suppliers</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
