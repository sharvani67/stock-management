import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DataTable from "../../layout/DataTable";  // Import the reusable DataTable component

const AdminConsumption = () => {
  const { siteId } = useParams();
  const [data, setData] = useState([]);
  const [siteName, setSiteName] = useState(""); // State for site name
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch consumption data
    axios
      .get(`http://localhost:5000/api/stockledger/consumption/${siteId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching consumption data:", error);
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
    { Header: "Product", accessor: "product" },
    { Header: "Quantity", accessor: "quantity_out" },
    { Header: "Units", accessor: "units" },
    { Header: "Description", accessor: "description" },
    { Header: "Attachment", accessor: "attachment", Cell: ({ value }) => value || "N/A" },
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center">
        Consumption Details for {loading ? "Loading..." : siteName}
      </h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <DataTable columns={columns} data={data} initialSearchValue="" />
      )}
    </div>
  );
};

export default AdminConsumption;
