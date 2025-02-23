import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SiteCards = () => {
  const [sites, setSites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/adminsites")
      .then((response) => {
        setSites(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sites:", error);
      });
  }, []);

  // Function to navigate to AdminOutput.js with selected site ID and type
  const handleNavigation = (siteId, type) => {
    navigate(`/admin-output/${siteId}/${type}`);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {sites.length > 0 ? (
          sites.map((site) => (
            <div key={site.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Site Name: {site.siteName}</h5>
                  <p className="card-text">Site Manager: {site.siteManager}</p>
                  <p className="card-text">Site ID: {site.id}</p>

                  <div className="btn-group d-flex flex-wrap">
                    <button
                      className="btn btn-primary m-1"
                      onClick={() => handleNavigation(site.id, "Purchase")}
                    >
                      Purchase
                    </button>
                    <button
                      className="btn btn-warning m-1"
                      onClick={() => handleNavigation(site.id, "Consumption")}
                    >
                      Consumption
                    </button>
                    <button
                      className="btn btn-danger m-1"
                      onClick={() => handleNavigation(site.id, "StockOut")}
                    >
                      Stock Out
                    </button>
                    <button
                      className="btn btn-success m-1"
                      onClick={() => handleNavigation(site.id, "Allocated")}
                    >
                      Allocated
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No sites available</p>
        )}
      </div>
    </div>
  );
};

export default SiteCards;
