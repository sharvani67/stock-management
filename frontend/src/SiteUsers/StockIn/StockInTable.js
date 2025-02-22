import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import DataTable from '../../layout/DataTable'; // Assuming you have a DataTable component
import { FaEdit, FaTrashAlt, FaEye, FaPlus,FaFilePdf, FaFileExcel  } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserNavbar from '../Navbar/UserNavbar';
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from '../../ApiService/Api';
import ViewStockInModal from './View_Stockin';

import EditStockIn from './Update_Stockin';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const StockInTable = () => {
  const { user } = useContext(AuthContext);
  const [purchaseData, setPurchaseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchStockInRecords = async () => {
      if (!user?.id) return;
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/stock-in`, {
          params: { userid: user.id },
        });
        const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPurchaseData(sortedData);
      } catch (err) {
        console.error("Error fetching stock-in records:", err);
        setError("Failed to fetch stock-in data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStockInRecords();
  }, [user]);

  
  const handleDelete = async (id) => {
    if (!id) {
      alert("Invalid stock ID.");
      return;
    }
  
    console.log("Deleting stock record with ID:", id); // Debugging
  
    if (!window.confirm("Are you sure you want to delete this record?")) return;
  
    try {
      const response = await axios.delete(`${BASE_URL}/stock-in/${id}`);
  
      if (response.data.success) {
        setPurchaseData(prevData => prevData.filter(stock => stock.id !== id));
        alert("Stock record deleted successfully.");
      } else {
        alert(response.data.message || "Failed to delete stock record.");
      }
    } catch (error) {
      console.error("Error deleting stock record:", error);
      alert("An error occurred while deleting the record.");
    }
  };
  
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Stock In Records", 20, 10);
    
    const tableColumn = ["Date", "Product Name", "Quantity", "Units", "Supplier Name"];
    const tableRows = purchaseData.map(item => [
      item.date, item.product, item.quantity_in, item.units, item.supplier
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("StockInRecords.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(purchaseData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "StockInData");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Create a Blob from the Excel buffer
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });

    // Create a temporary download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "StockInRecords.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  
  

  
  const columns = [
    { Header: 'Date', accessor: 'date' },
    { Header: 'Product Name', accessor: 'product' },
    { Header: 'Quantity', accessor: 'quantity_in' },
    { Header: 'Units', accessor: 'units' },
    { Header: 'Supplier Name', accessor: 'supplier' },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div className="d-flex align-items-center gap-2">
          <Button variant="outline-info" size="sm" onClick={() => { setSelectedStock(row.original); setShowViewModal(true); }}>
            <FaEye />
          </Button>
          <Button variant="outline-warning" size="sm" onClick={() => { setSelectedStock(row.original); setShowEditModal(true); }}>
            <FaEdit />
          </Button>
         <Button variant="outline-danger" size="sm" onClick={() => handleDelete(row.original.id)}>
         <FaTrashAlt />
       </Button>
       
        </div>
      ),
    },
  ];

  return (
    <div>
      <UserNavbar />
      <div className="container mt-5">
        <h1 className="mb-4">StockIn Management</h1>
        <div>
            <Button variant="secondary" className="me-2" onClick={exportToPDF}>
              <FaFilePdf /> Export as PDF
            </Button>
            <Button variant="success" onClick={exportToExcel}>
              <FaFileExcel /> Export as Excel
            </Button>
          </div>

        {loading && <p>Loading data...</p>}
        {error && <p className="text-danger">{error}</p>}

        <div className="d-flex justify-content-end mb-3">
          <Link to="/stockin">
            <Button variant="primary" className="add-button">
              <FaPlus className="me-2" /> Add New StockIn
            </Button>
          </Link>
        </div>

        <DataTable columns={columns} data={purchaseData} />
      </div>

      <ViewStockInModal show={showViewModal} handleClose={() => setShowViewModal(false)} stockInData={selectedStock} />

      {showEditModal && <EditStockIn show={showEditModal} handleClose={() => setShowEditModal(false)} stockData={selectedStock} />}
    </div>
  );
};

export default StockInTable;