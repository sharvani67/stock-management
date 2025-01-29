import React, { useState, useEffect, useContext } from "react";
import axios from "axios"; // Import axios
import DataTable from "../../layout/DataTable";
import StockOutModal from "./StockOutForm";
import { Button } from "react-bootstrap";
import UserNavbar from "../Navbar/UserNavbar";
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../ApiService/Api";

const StockOutTable = () => {
  const { user, logout } = useContext(AuthContext);
  const [data, setData] = useState([]); // State to store API data
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Fetch stock-out data from API
  // Fetch stock-out data from API
  const fetchStockOutRecords = async () => {
    try {
      if (!user?.id) return; // Wait until user is loaded
  
      const response = await axios.get(`${BASE_URL}/stock-out`, {
        params: { userid: user.id } // Ensure userid is always passed
      });
  
      console.log("Filtered API Response:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching stock-out records:", error);
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
  

  

  // Table columns
  const columns = React.useMemo(
    () => [
      { Header: "Date", accessor: "date" },
      // { Header: "Site Name", accessor: "site_name" },
      { Header: "Destination Site", accessor: "receiver" },
      { Header: "Product Name", accessor: "product" },
      { Header: "Brand Name", accessor: "brand" },
      { Header: "Quantity", accessor: "quantity_out" },
      { Header: "Units", accessor: "units" },
      // { Header: "Transaction Type", accessor: "transaction_type" },
    ],
    []
  );

  return (
    <div>
      <UserNavbar />
      <div className="container mt-4">
        <h1 className="mb-4">Stock Out Records</h1>
        <div className="d-flex justify-content-end mb-3">
          <Button variant="primary" onClick={handleOpen}>
            Stock Out Form
          </Button>
        </div>

        <StockOutModal show={showModal} handleClose={handleClose} />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
};

export default StockOutTable;
