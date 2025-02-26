import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DataTable from "../../layout/DataTable";  // Import the reusable DataTable component
import AdminNavbar from "../Navbar/Navbar";
import { BASE_URL } from "../../ApiService/Api";

const AdminPurchase = () => {
  const { siteId } = useParams();
  const [data, setData] = useState([]);
  const [siteName, setSiteName] = useState(""); // State for site name
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch purchase data
    axios
      .get(`${BASE_URL}/api/stockledger/purchase/${siteId}`)
      .then((response) => {
        // Sort data by date in descending order (latest first)
        const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching purchase data:", error);
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
    { Header: "Bill.No", accessor: "invoice_no" },
    { Header: "Supplier", accessor: "supplier" },
    { Header: "Product", accessor: "product" },
    { Header: "Quantity", accessor: "quantity_in" },
    { Header: "Units", accessor: "units" },
    { Header: "Description", accessor: "description", Cell: ({ value }) => value || "N/A" },
  ];

  return (
    <div>
      <AdminNavbar />
    <div className="container mt-4">
      <h2 className="text-center">
        Purchase Details for {loading ? "Loading..." : siteName}
      </h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <DataTable columns={columns} data={data} initialSearchValue="" />
      )}
    </div>
    </div>
  );
};

export default AdminPurchase;
