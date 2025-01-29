import React, { useMemo, useContext, useEffect, useState } from "react";
import DataTable from "../layout/DataTable";
import UserNavbar from "./Navbar/UserNavbar";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const AllocatedStock = () => {
  const { user, logout } = useContext(AuthContext);
  const [data, setData] = useState([]); // State to store API data
  const [loading, setLoading] = useState(true);
  const [selectedSite, setSelectedSite] = useState(null); // State for selected site
  const [sites, setSites] = useState([]); // State to store all user sites

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch(`http://localhost:5000/sites?userId=${user?.id}`);
        if (response.ok) {
          const data = await response.json();
          
          // Filter the sites based on the userId (assuming that userId is associated with specific sites)
          const userSites = data.filter(site => site.userId === user?.id);

          // If matching sites are found, use the details of the first one
          if (userSites.length > 0) {
            const selectedSite = userSites[0]; // Get the site details related to the user

            setSelectedSite(selectedSite); // Set selected site
            setSites(userSites); // Save all the sites related to the user
          } else {
            console.error("No sites found for the user");
          }
        } else {
          console.error("Failed to fetch sites");
        }
      } catch (error) {
        console.error("Error fetching sites:", error);
      }
    };

    if (user?.id) {
      fetchSites();
    }
  }, [user?.id]);

  const fetchStockOutRecords = async () => {
    try {
      if (!user?.id) return; // Wait until user is loaded

      // Fetch stock out records
      const response = await axios.get("http://localhost:5000/allocated");

      if (response.data) {
        // Filter records by siteName matching selected site's siteName
        const filteredRecords = response.data.filter(record => record.receiver === selectedSite?.siteName);

        console.log("Filtered Stock Out Records:", filteredRecords);
        setData(filteredRecords);
      }
    } catch (error) {
      console.error("Error fetching stock-out records:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load data when user or site details are available
  useEffect(() => {
    if (user?.id && selectedSite?.siteName) {
      fetchStockOutRecords();
    }
  }, [user?.id, selectedSite?.siteName]); // Fetch again when user or site changes

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Product Name",
        accessor: "product",
      },
      {
        Header: "Brand Name",
        accessor: "brand",
      },
      {
        Header: "Quantity",
        accessor: "quantity_out",
      },
      {
        Header: "Units",
        accessor: "units",
      },
      {
        Header: "From Site",
        accessor: "site_name",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ value }) => (
          <select
            defaultValue={value}
            className="form-select"
            style={{ width: "150px" }}
          >
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <UserNavbar />
      <div className="container mt-4">
        <h1 className="mb-4">Allocated Stock</h1>
        {/* Display the data table only when the data is loaded */}
        {!loading ? <DataTable columns={columns} data={data} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default AllocatedStock;
