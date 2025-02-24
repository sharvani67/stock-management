import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Home/SiteCards.css"; // Import the updated CSS

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
    <div className="sitecards-container">
      <h2 className="sitecards-heading">🏗️ Active Construction Sites</h2>
      <div className="row">
        {sites.length > 0 ? (
          sites.map((site) => (
            <div key={site.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card sitecard">
                <div className="card-body">
                  <h5 className="sitecard-title">{site.siteName}</h5>
                  <p className="sitecard-text"><strong>👷 Manager:</strong> {site.siteManager}</p>
                  

                  <div className="btn-group d-flex flex-wrap">
                    <button className="btn sitecard-btn btn-purchase" onClick={() => handleNavigation(site.id, "Purchase")}>
                      🛒 Purchase
                    </button>
                    <button className="btn sitecard-btn btn-consumption" onClick={() => handleNavigation(site.id, "Consumption")}>
                      🔥 Consumption
                    </button>
                    <button className="btn sitecard-btn btn-stockout" onClick={() => handleNavigation(site.id, "StockOut")}>
                      📦 Stock Out
                    </button>
                    <button className="btn sitecard-btn btn-allocated" onClick={() => handleNavigation(site.id, "Allocated")}>
                      ✅ Allocated
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-sites">🚧 No active sites available</p>
        )}
      </div>
    </div>
  );
};

export default SiteCards;
