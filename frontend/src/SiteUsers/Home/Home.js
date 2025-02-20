import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaTruck,
  FaChartPie,
  FaFileAlt,
  FaTachometerAlt,
  FaBell,
} from "react-icons/fa";
import "./Home.css"; // Ensure this file exists
import UserNavbar from "../Navbar/UserNavbar";
import bgImage from "../../assets/images/images.jpeg"; // Ensure this image exists in the correct path

const Home = () => {
  return (
    <div>
      <UserNavbar /> {/* Navbar at the top */}
      <div className="home-container">
        {/* Hero Section */}
        <header
          className="hero-section"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="hero-overlay">
            <h1>Welcome to MS Constructions</h1>
            <p>Your Trusted Partner in Building Dreams</p>
            <Link to=" " className="hero-button">
              Get in Touch
            </Link>
          </div>
        </header>

        {/* Quick Access Menu Section */}
        <section className="quick-access">
          <h2>Quick Access</h2>
          <div className="menu-grid">
            {/* <Link to="/home" className="menu-item">
              <FaHome />
              <h3>Home</h3>
              <p>Return to the homepage</p>
            </Link> */}
            <Link to="/userdashboard" className="menu-item">
              <FaTachometerAlt />
              <h3>Dashboard</h3>
              <p>View your overall stats</p>
            </Link>
            <Link to="/stockintable" className="menu-item">
              <FaBoxOpen />
              <h3>Purchase</h3>
              <p>Manage your stock-in purchases</p>
            </Link>
            <Link to="/stockout" className="menu-item">
              <FaTruck />
              <h3>Stock Out</h3>
              <p>Track outgoing stock</p>
            </Link>
            <Link to="/stockconsumed" className="menu-item">
              <FaChartPie />
              <h3>Stock Consumed</h3>
              <p>Monitor usage of materials</p>
            </Link>
            <Link to="/allocatedtable" className="menu-item">
              <FaBoxOpen />
              <h3>StockIn (Allocated)</h3>
              <p>Check allocated inventory</p>
            </Link>
            <Link to="/summary" className="menu-item">
              <FaFileAlt />
              <h3>Reports</h3>
              <p>Generate and view reports</p>
            </Link>
            {/* <Link to="/notifications" className="menu-item">
              <FaBell />
              <h3>Notifications</h3>
              <p>Stay updated with alerts</p>
            </Link> */}
          </div>
        </section>

        {/* Services Section */}
        <section className="services">
          <h2>Our Services</h2>
          <div className="service-cards">
            <div className="service-card">
              <h3>Residential Construction</h3>
              <p>
                We build homes with quality materials and expert craftsmanship.
              </p>
            </div>
            <div className="service-card">
              <h3>Commercial Projects</h3>
              <p>From office buildings to retail spaces, we handle it all.</p>
            </div>
            <div className="service-card">
              <h3>Renovation & Remodeling</h3>
              <p>Upgrade your space with our expert remodeling services.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
