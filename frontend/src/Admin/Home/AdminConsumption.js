import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DataTable from "../../layout/DataTable";  // Import the reusable DataTable component
import AdminNavbar from "../Navbar/Navbar"; // Use correct file name
 // Ensure correct import
import { BASE_URL } from "../../ApiService/Api";
import "../Home/Al.css"

const AdminConsumption = () => {
  const { siteId } = useParams();
  const [data, setData] = useState([]);
  const [siteName, setSiteName] = useState(""); // State for site name
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch consumption data
    axios
      .get(`${BASE_URL}/api/stockledger/consumption/${siteId}`)
      .then((response) => {
        // Sort data by date in descending order (latest first)
        const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching consumption data:", error);
      });

    // Fetch site details to get the site name
    axios
      .get(`${BASE_URL}/api/adminsites/${siteId}`)
      .then((response) => {
        console.log("Site API Response:", response.data); // Debugging step
        if (response.data && response.data.siteName) {
          setSiteName(response.data.siteName);
        } else {
          setSiteName(`Site ${siteId}`); // Fallback if siteName is missing
        }
      })
      .catch((error) => {
        console.error("Error fetching site details:", error);
        setSiteName(`Site ${siteId}`); // Fallback if API fails
      })
      .finally(() => {
        setLoading(false);
      });

  }, [siteId]);

  // Define table columns for DataTable
  const columns = [
    { 
      Header: 'Date', 
      accessor: 'date',
      Cell: ({ value }) => new Date(value).toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata', 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      })
    },
    { Header: "Product", accessor: "product" },
    { Header: "Quantity", accessor: "quantity_out" },
    { Header: "Units", accessor: "units" },
    { Header: "Description", accessor: "description" },
    { 
      Header: "Attachment", 
      accessor: "attachment", 
      Cell: ({ value }) => 
        value ? (
          <a href={`${BASE_URL}/uploads/${value}`} target="_blank" rel="noopener noreferrer">
            View Attachment
          </a>
        ) : "N/A"
    },
  ];

  return (
    <>
      {/* Navbar is fixed, so we add padding below */}
      <AdminNavbar />
      <div className="body">
      <div className="admin-content container mt-5">
        <h2 className="text-center">
          Consumption Details for {loading ? "Loading..." : siteName}
        </h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <DataTable columns={columns} data={data} initialSearchValue="" />
        )}
      </div>
      </div>
    </>
  );
};

export default AdminConsumption;
