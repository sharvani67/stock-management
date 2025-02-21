import React, { useState, useEffect, useMemo, useContext } from "react";
import DataTable from "../../layout/DataTable";
import StockConsumedForm from "./StockConsumedForm";
import ViewStockConsumed from "../StockConsumed/View_Stockconsumed"; // Import the View Modal
import { Button } from "react-bootstrap";
import UserNavbar from "../Navbar/UserNavbar";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../ApiService/Api";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const StockConsumedTable = () => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const fetchStockConsumedRecords = async () => {
    try {
      if (!user?.id) return;

      const response = await axios.get(`${BASE_URL}/stock-consumed`, {
        params: { userid: user.id },
      });

      console.log("Filtered API Response:", response.data);

      const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));

      setData(sortedData);
    } catch (error) {
      console.error("Error fetching stock-consumed records:", error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchStockConsumedRecords();
    }
  }, [user]);

  const handleView = (stock) => {
    console.log("View button clicked, Stock Data:", stock);
    setSelectedStock(stock);
    setShowViewModal(true);
  };
  

  const handleEdit = (stock) => {
    setSelectedStock(stock);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      const response = await axios.delete(`${BASE_URL}/stock-consumed/${id}`);

      if (response.status === 200) {
        alert("Stock record deleted successfully!");
        setData((prevData) => prevData.filter((item) => item.id !== id));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting stock record:", error);
      alert("Failed to delete stock record.");
    }
  };

  const handleSave = (newData) => {
    setData((prevData) => [newData, ...prevData]);
  };

  const columns = useMemo(
    () => [
      { Header: "Date", accessor: "date" },
      { Header: "Product Name", accessor: "product" },
      { Header: "Quantity", accessor: "quantity_out" },
      { Header: "Units", accessor: "units" },
      { Header: "Description", accessor: "description" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex align-items-center gap-2">
            <Button variant="outline-info" size="sm" onClick={() => handleView(row.original)}>
              <FaEye />
            </Button>
            <Button variant="outline-warning" size="sm" onClick={() => handleEdit(row.original)}>
              <FaEdit />
            </Button>
            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(row.original.id)}>
              <FaTrashAlt />
            </Button>
          </div>
        ),
      },
    ],
    [data]
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

        <StockConsumedForm show={showModal} handleClose={handleClose} handleSave={handleSave} />

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <DataTable columns={columns} data={data} />
        )}

        {/* Add the View Stock Consumed Modal */}
        <ViewStockConsumed 
          show={showViewModal} 
          handleClose={() => setShowViewModal(false)} 
          stockConsumedData={selectedStock} 
        />
      </div>
    </div>
  );
};

export default StockConsumedTable;
