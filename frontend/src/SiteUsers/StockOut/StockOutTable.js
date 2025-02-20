import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DataTable from "../../layout/DataTable";
import StockOutModal from "./StockOutForm"; // Ensure the correct import
import { Button } from "react-bootstrap";
import UserNavbar from "../Navbar/UserNavbar";
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../ApiService/Api";

const StockOutTable = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const fetchStockOutRecords = async () => {
    try {
      if (!user?.id) return;
  
      const response = await axios.get(`${BASE_URL}/stock-out`, {
        params: { userid: user.id }
      });
  
      console.log("Filtered API Response:", response.data);
  
      // Sort data by date in descending order (latest first)
      const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      setData(sortedData);
    } catch (error) {
      console.error("Error fetching stock-out records:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (user?.id) {
      fetchStockOutRecords();
    }
  }, [user]);

  const columns = React.useMemo(
    () => [
      { Header: "Date", accessor: "date" },
      { Header: "Destination Site", accessor: "receiver" },
      { Header: "Product Name", accessor: "product" },
     
      { Header: "Quantity", accessor: "quantity_out" },
      { Header: "Units", accessor: "units" },
    ],
    []
  );

  const handleSave = (newData) => {
    setData(prevData => [newData, ...prevData]); // Add new data at the beginning
  };
  
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

        <StockOutModal show={showModal} handleClose={handleClose} handleSave={handleSave} />

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