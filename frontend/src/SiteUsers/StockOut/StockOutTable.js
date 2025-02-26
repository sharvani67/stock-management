import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DataTable from "../../layout/DataTable";
import StockOutModal from "./StockOutForm"; // Form for adding stock-out
import ViewStockout from "./View_Stockout"; // View modal
import EditStockOut from "./Edit_Stockout"; // Edit modal
import { Button } from "react-bootstrap";
import UserNavbar from "../Navbar/UserNavbar";
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../ApiService/Api";
import { FaEdit, FaTrashAlt, FaEye, FaPlus,FaFilePdf,FaFileExcel } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const StockOutTable = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStockOut, setSelectedStockOut] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const fetchStockOutRecords = async () => {
    try {
      if (!user?.id) return;

      const response = await axios.get(`${BASE_URL}/stock-out`, {
        params: { userid: user.id },
      });

      console.log("Filtered API Response:", response.data);

      // Sort data by date in descending order (latest first)
      const sortedData = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

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

  const handleView = (stockOut) => {
    console.log("View button clicked, StockOut Data:", stockOut);
    setSelectedStockOut(stockOut);
    setShowViewModal(true);
  };

  const handleEdit = (stockOut) => {
    setSelectedStockOut(stockOut);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
  
    try {
      const response = await axios.delete(`${BASE_URL}/stock-out/${id}`);
  
      if (response.status === 200) {
        alert("Stock record deleted successfully!");
        setData((prevData) => prevData.filter((item) => item.id !== id)); // Remove from UI
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting stock-out record:", error);
      alert("Failed to delete stock record.");
    }
  };
  

  const handleSave = (newData) => {
    setData((prevData) => [newData, ...prevData]); // Add new data at the beginning
  };

  const handleUpdate = (updatedData) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === updatedData.id ? updatedData : item))
    );
  };
  // Export table data as PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Stock Out Records", 14, 10);
    const tableColumn = ["Date", "Time", "Destination Site", "Product Name", "Quantity", "Units"];
    const tableRows = data.map((item) => [
      item.date,
      item.time,
      item.receiver,
      item.product,
      item.quantity_out,
      item.units,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("StockOutRecords.pdf");
  };

  // Export table data as Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.map(({ date, time, receiver, product, quantity_out, units }) => ({
      Date: date,
      Time: time,
      "Destination Site": receiver,
      "Product Name": product,
      Quantity: quantity_out,
      Units: units,
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "StockOutRecords");
    XLSX.writeFile(workbook, "StockOutRecords.xlsx");
  };


  const columns = React.useMemo(
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
      { Header: "Document No", accessor: "document_no" },
      { Header: "Destination Site", accessor: "receiver" },
      { Header: "Product Name", accessor: "product" },
      { Header: "Quantity", accessor: "quantity_out" },
      { Header: "Units", accessor: "units" },

      { Header: "Status", accessor: "status" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex align-items-center gap-2">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => handleView(row.original)}
            >
              <FaEye />
            </Button>
            <Button
              variant="outline-warning"
              size="sm"
              onClick={() => handleEdit(row.original)}
            >
              <FaEdit />
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleDelete(row.original.id)}
            >
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
        <h1 className="mb-4">Stock Out Records</h1>
        <div>
            <Button variant="secondary" className="me-2" onClick={exportToPDF}>
              <FaFilePdf /> Export as PDF
            </Button>
            <Button variant="success" onClick={exportToExcel}>
              <FaFileExcel /> Export as Excel
            </Button>
          </div>
        <div className="d-flex justify-content-end mb-3">
          <Button variant="primary" onClick={handleOpen}>
            <FaPlus /> Stock Out Form
          </Button>
          
        </div>

        {/* Add Stock-Out Modal */}
        <StockOutModal show={showModal} handleClose={handleClose} handleSave={handleSave} />

        {/* View Stock-Out Modal */}
        <ViewStockout
          show={showViewModal}
          handleClose={() => setShowViewModal(false)}
          stockoutData={selectedStockOut}
        />

        {/* Edit Stock-Out Modal */}
        {selectedStockOut && (
          <EditStockOut
            show={showEditModal}
            handleClose={() => setShowEditModal(false)}
            stockOutData={selectedStockOut}
            handleUpdate={handleUpdate}
          />
        )}

        {loading ? <p>Loading...</p> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
};

export default StockOutTable;
