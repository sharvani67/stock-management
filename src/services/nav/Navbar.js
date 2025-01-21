import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <div className="d-flex flex-column vh-100 bg-dark text-white">
      <div className="p-3 mb-4">
        <h4 className="text-center">
          <i className="bi bi-box-seam me-2"></i> Stock Management
        </h4>
      </div>
      <ul className="nav flex-column px-3">
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/">
            <i className="bi bi-people-fill me-2"></i> Users
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/purchase">
            <i className="bi bi-bag-fill me-2"></i> Purchases
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/add-purchase">
            <i className="bi bi-file-plus-fill me-2"></i> Add Purchase
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/site">
            <i className="bi bi-building me-2"></i> Sites
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/add-site">
            <i className="bi bi-file-earmark-plus-fill me-2"></i> Add Site
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/products">
            <i className="bi bi-boxes me-2"></i> Products
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/brands">
            <i className="bi bi-tags-fill me-2"></i> Brands
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/unit">
            <i className="bi bi-rulers me-2"></i> Units
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/allocations">
            <i className="bi bi-diagram-3-fill me-2"></i> Allocations
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/centralstock">
            <i className="bi bi-inboxes-fill me-2"></i> Central Stock
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/suppliers">
            <i className="bi bi-person-lines-fill me-2"></i> Suppliers
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
