import React from "react";
import AdminNavbar from "../Navbar/Navbar";
import SiteCards from "./SiteCards";
import "../Home/Al.css"


const AdminHome = () => {
  return (
    <div>
      <AdminNavbar/>
      <div className="body">
      <div className="container mt-4">
        <SiteCards />
      </div>
      </div>
    </div>
  );
};

export default AdminHome;
