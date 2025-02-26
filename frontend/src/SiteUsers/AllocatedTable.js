import React, { useMemo, useContext, useEffect, useState } from "react";
import DataTable from "../layout/DataTable";
import UserNavbar from "./Navbar/UserNavbar";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../ApiService/Api";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const AllocatedStock = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]); // State to store API data
  const [loading, setLoading] = useState(true);
  const [selectedSite, setSelectedSite] = useState(null); // State for selected site
  const [sites, setSites] = useState([]); // State to store all user sites

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch(`${BASE_URL}/sites?userId=${user?.id}`);
        if (response.ok) {
          const data = await response.json();
          const userSites = data.filter(site => site.userId === user?.id);
          if (userSites.length > 0) {
            setSelectedSite(userSites[0]);
            setSites(userSites);
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
      const response = await axios.get(`${BASE_URL}/allocated`);

      if (response.data) {
        // Filter records by siteName matching selected site's siteName
        const filteredRecords = response.data.filter(
          (record) => record.receiver === selectedSite?.siteName
        );

        // Sort records by date in descending order (latest first)
        const sortedRecords = filteredRecords.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setData(sortedRecords);
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
  }, [user?.id, selectedSite?.siteName]);

  // Function to update status
  const updateStatus = async (id) => {
    // Show confirmation dialog before proceeding
    const confirmUpdate = window.confirm("Are you sure you want to mark this as Received?");
    
    if (!confirmUpdate) return; // Stop function if user cancels
  
    try {
      // Send API request to update status
      await axios.put(`${BASE_URL}/allocated/updateStatus/${id}`, { status: "Received" });
  
      // Update local state to reflect the change immediately
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: "Received" } : item
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Define columns for the table
  const columns = useMemo(
    () => [
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
      {
        Header: "Product Name",
        accessor: "product",
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
        Header: "Attachment",
        accessor: "attachment",
        Cell: ({ value }) => (
          value ? (
            <a href={`${BASE_URL}/uploads/${value}`} target="_blank" rel="noopener noreferrer">
            View Attachment
          </a>
          ) : (
            <span style={{ color: "gray" }}>No Attachment</span>
          )
        ),
      },
      

      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => (
          <button
            className={`btn ${row.original.status === "Pending" ? "btn-warning" : "btn-success"}`}
            onClick={() => row.original.status === "Pending" && updateStatus(row.original.id)}
            disabled={row.original.status === "Received"}
          >
            {row.original.status}
          </button>
        ),
      },
    ],
    []
  );

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Allocated Stock Report", 14, 10);
    const tableColumn = ["Date", "Product Name", "Quantity", "Units", "From Site", "Status"];
    const tableRows = data.map(({ date, product, quantity_out, units, site_name, status }) => [
      date, product, quantity_out, units, site_name, status,
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save("Allocated_Stock_Report.pdf");
  };

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data.map(({ date, product, quantity_out, units, site_name, status }) => ({
      Date: date,
      "Product Name": product,
      Quantity: quantity_out,
      Units: units,
      "From Site": site_name,
      Status: status,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Allocated Stock");
    XLSX.writeFile(wb, "Allocated_Stock_Report.xlsx");
  };

  return (
    <div>
      <UserNavbar />
      <div className="container mt-4">
        <h1 className="mb-4">Allocated Stock</h1>
        {/* Export Buttons */}
        <div className="mb-3">
          <button className="btn btn-primary me-2" onClick={exportToPDF}>
            Export as PDF
          </button>
          <button className="btn btn-success" onClick={exportToExcel}>
            Export as Excel
          </button>
        </div>
        {/* Display the data table only when the data is loaded */}
        {!loading ? <DataTable columns={columns} data={data} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default AllocatedStock;
