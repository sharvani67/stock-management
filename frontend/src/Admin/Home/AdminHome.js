import React from "react";
import AdminNavbar from "../Navbar/Navbar";
import SiteCards from "./SiteCards";


const AdminHome = () => {
  return (
    <div>
      <AdminNavbar/>
      <div className="container mt-4">
        <h2>Sites</h2>
        <SiteCards />
      </div>
    </div>
  );
};

export default AdminHome;
