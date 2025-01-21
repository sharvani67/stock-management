// src/Components/Sidebar/Sidebar.js

import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Sidebar() {
  return (
    <div className="d-flex flex-column flex-shrink-0 bg-dark text-white vh-100">
      {/* Sidebar Header */}
      <div className="p-3">
        <h2 className="d-none d-lg-block text-center">Dashboard</h2>
      </div>

      {/* Toggle Button for Small Screens */}
      <button
        className="btn btn-dark d-md-none mx-3 mb-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-expanded="false"
        aria-controls="sidebarMenu"
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar Menu */}
      <div id="sidebarMenu" className="collapse d-md-block">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/users" className="nav-link text-white d-flex align-items-center">
              <i className="fas fa-users me-2"></i>
              <span className="d-none d-lg-inline">Users</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/purchase" className="nav-link text-white d-flex align-items-center">
              <i className="fas fa-shopping-cart me-2"></i>
              <span className="d-none d-lg-inline">Purchases</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add-purchase" className="nav-link text-white d-flex align-items-center">
              <i className="fas fa-plus-circle me-2"></i>
              <span className="d-none d-lg-inline">Add Purchase</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/site" className="nav-link text-white d-flex align-items-center">
              <i className="fas fa-map-marker-alt me-2"></i>
              <span className="d-none d-lg-inline">Sites</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link text-white d-flex align-items-center">
              <i className="fas fa-cogs me-2"></i>
              <span className="d-none d-lg-inline">Products</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/brands" className="nav-link text-white d-flex align-items-center">
              <i className="fas fa-tag me-2"></i>
              <span className="d-none d-lg-inline">Brands</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/unit" className="nav-link text-white d-flex align-items-center">
              <i className="fas fa-box me-2"></i>
              <span className="d-none d-lg-inline">Units</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/allocations" className="nav-link text-white d-flex align-items-center">
              <i className="fas fa-archive me-2"></i>
              <span className="d-none d-lg-inline">Allocations</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/centralstock" className="nav-link text-white d-flex align-items-center">
              <i className="fas fa-database me-2"></i>
              <span className="d-none d-lg-inline">Central Stock</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/suppliers" className="nav-link text-white d-flex align-items-center">
              <i className="fas fa-truck me-2"></i>
              <span className="d-none d-lg-inline">Suppliers</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
