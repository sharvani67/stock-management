import React, { useState, useEffect, useMemo, useContext } from "react";
import DataTable from "../../layout/DataTable";
import StockConsumedForm from "./StockConsumedForm";
import { Button } from "react-bootstrap";
import UserNavbar from "../Navbar/UserNavbar";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios"; // Import axios for API calls
import { BASE_URL } from "../../ApiService/Api";

const StockConsumedTable = () => {
  const { user, logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]); // State to hold API data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = (formData) => {
    console.log("Form Data Submitted: ", formData);
    // Process form data here
  };

  const fetchStockOutRecords = async () => {
    try {
      if (!user?.id) return; // Wait until user is loaded
  
      const response = await axios.get(`${BASE_URL}/stock-consumed`, {
        params: { userid: user.id } // Ensure userid is always passed
      });
  
      console.log("Filtered API Response:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching stock-consumed records:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Load data when user is available
  useEffect(() => {
    if (user?.id) {
      fetchStockOutRecords();
    }
  }, [user]); // Fetch again when user updates

  // Define columns for the table
  const columns = useMemo(
    () => [
      { Header: "Date", accessor: "date" },
      { Header: "Product Name", accessor: "product" },
      { Header: "Brand Name", accessor: "brand" },
      { Header: "Quantity", accessor: "quantity_out" },
      { Header: "Units", accessor: "units" },
      // { Header: "Description", accessor: "description" },
    ],
    []
  );

  return (
    <div>
      <UserNavbar />
      <div className="container mt-4">
        <h1 className="mb-4">Stock Consumed Records</h1>
        <div className="d-flex justify-content-end mb-3">
          <Button variant="primary" onClick={handleOpen}>
            Add Stock Consumed
          </Button>
        </div>

        <StockConsumedForm show={showModal} handleClose={handleClose} handleSubmit={handleSubmit} />

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
};

export default StockConsumedTable;
