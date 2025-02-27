import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import DataTable from "../../layout/DataTable"; // Assuming you have a DataTable component
import {
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaPlus,
  FaFilePdf,
  FaFileExcel,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import UserNavbar from "../Navbar/UserNavbar";
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../ApiService/Api";
import ViewStockInModal from "./View_Stockin";

import EditStockIn from "./Update_Stockin";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import "../StockIn/Si_pdfExcel.css"

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
        const sortedData = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
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
        setPurchaseData((prevData) =>
          prevData.filter((stock) => stock.id !== id)
        );
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
  
    const tableColumn = [
      "Date & Time",
      "Bill Number",
      "Product Name",
      "Supplier Name",
      "Unit Name",
      "Price",
      "Quantity",
      "Total Price",
      "Description"
    ];
  
    const tableRows = purchaseData.map(({ date, invoice_no, product, supplier, units, price, quantity_in, total_price, description }) => [
      new Date(date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      invoice_no,
      product,
      supplier,
      units,
      price,
      quantity_in,
      total_price,
      description
    ]);
  
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [0, 0, 255] } // Blue header for better readability
    });
  
    doc.save("StockInRecords.pdf");
  };
  
  const exportToExcel = () => {
    const filteredData = purchaseData.map(({ date, invoice_no, product, supplier, units, price, quantity_in, total_price, description }) => ({
      "Date & Time": new Date(date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      "Bill Number": invoice_no,
      "Product Name": product,
      "Supplier Name": supplier,
      "Unit Name": units,
      "Price": price,
      "Quantity": quantity_in,
      "Total Price": total_price,
      "Description": description
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "StockInData");
  
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
  
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
    {
      Header: "Date",
      accessor: "date",
      Cell: ({ value }) =>
        new Date(value).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
    },
    { Header: "Product Name", accessor: "product" },
    { Header: "Quantity", accessor: "quantity_in" },
    { Header: "Units", accessor: "units" },
    { Header: "Supplier Name", accessor: "supplier" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => {
              setSelectedStock(row.original);
              setShowViewModal(true);
            }}
          >
            <FaEye />
          </Button>
          <Button
            variant="outline-warning"
            size="sm"
            onClick={() => {
              setSelectedStock(row.original);
              setShowEditModal(true);
            }}
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
  ];

  return (
    <div>
      <UserNavbar />
      
      <div className="container mt-5">
        <h1 className="mb-4">StockIn Management</h1>
        <div className="d-flex flex-wrap gap-2 mb-3">
          <Button
            variant="secondary"
            className="pdfbutton"
            onClick={exportToPDF}
          >
            <FaFilePdf className="me-2" /> Export as PDF
          </Button>
          <Button
            variant="success"
            className="excelbutton"
            onClick={exportToExcel}
          >
            <FaFileExcel className="me-2" /> Export as Excel
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

      <ViewStockInModal
        show={showViewModal}
        handleClose={() => setShowViewModal(false)}
        stockInData={selectedStock}
      />

      {showEditModal && (
        <EditStockIn
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          stockData={selectedStock}
        />
      )}
    </div>
  );
};

export default StockInTable;
