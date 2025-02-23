import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DataTable from "../../layout/DataTable"; // Import the reusable DataTable component
import AdminNavbar from "../Navbar/Navbar";

const AdminAllocated = () => {
  const { siteId } = useParams();
  const [data, setData] = useState([]);
  const [siteName, setSiteName] = useState(""); // State for site name
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch allocated stock data
    axios
      .get(`http://localhost:5000/api/stockledger/allocated/${siteId}`)
      .then((response) => {
        // Sort data by date in descending order (latest first)
        const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching allocated data:", error);
      });
  
    // Fetch site details to get the site name
    axios
      .get(`http://localhost:5000/api/adminsites/${siteId}`)
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
    { Header: "Date", accessor: "date", Cell: ({ value }) => value || "N/A" },
    { Header: "From Site", accessor: "site_name" },
    { Header: "Product", accessor: "product" },
    { Header: "Quantity", accessor: "quantity_out" },
    { Header: "Units", accessor: "units" },
    { Header: "Description", accessor: "description" },
    { Header: "Status", accessor: "status", Cell: ({ value }) => value || "N/A" },
    { 
      Header: "Attachment", 
      accessor: "attachment", 
      Cell: ({ value }) => 
        value ? (
          <a href={`http://localhost:5000/uploads/${value}`} target="_blank" rel="noopener noreferrer">
            View Attachment
          </a>
        ) : "N/A"
    },
  ];

  return (
    <div className="container mt-4">
      <AdminNavbar />
      <h2 className="text-center">
        Allocated Stock Details for {loading ? "Loading..." : siteName}
      </h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <DataTable columns={columns} data={data} initialSearchValue="" />
      )}
    </div>
  );
};

export default AdminAllocated;
