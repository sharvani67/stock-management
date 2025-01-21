// src/Components/Sidebar/Sidebar.js

import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import './SideBar.css'; // Import the custom CSS file

function Sidebar() {
  return (
    <div>
      {/* Toggle Button for Small Screens */}
      <button className="btn btn-dark d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-expanded="false" aria-controls="sidebar">
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar */}
      <div id="sidebar" className="bg-dark text-white p-3 collapse d-md-block">
        <h2>Sidebar</h2>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/users" className="nav-link text-white">
              <i className="fas fa-users"></i> Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/purchase" className="nav-link text-white">
              <i className="fas fa-shopping-cart"></i> Purchases
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add-purchase" className="nav-link text-white">
              <i className="fas fa-plus-circle"></i> Add Purchase
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/site" className="nav-link text-white">
              <i className="fas fa-map-marker-alt"></i> Sites
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link text-white">
              <i className="fas fa-cogs"></i> Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/brands" className="nav-link text-white">
              <i className="fas fa-tag"></i> Brands
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/unit" className="nav-link text-white">
              <i className="fas fa-box"></i> Units
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/allocations" className="nav-link text-white">
              <i className="fas fa-archive"></i> Allocations
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/centralstock" className="nav-link text-white">
              <i className="fas fa-database"></i> Central Stock
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/suppliers" className="nav-link text-white">
              <i className="fas fa-truck"></i> Suppliers
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
