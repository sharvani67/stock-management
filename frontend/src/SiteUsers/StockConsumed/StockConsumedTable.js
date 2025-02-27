import React, { useState, useEffect, useMemo, useContext } from "react";
import DataTable from "../../layout/DataTable";
import StockConsumedForm from "./StockConsumedForm";
import ViewStockConsumed from "../StockConsumed/View_Stockconsumed";
import EditStockConsumedModal from "../StockConsumed/EditStockcomsumed"; // Import Edit Modal
import { Button } from "react-bootstrap";
import UserNavbar from "../Navbar/UserNavbar";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../ApiService/Api";
import {
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaFilePdf,
  FaFileExcel,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import "../StockIn/Si_pdfExcel.css";

const StockConsumedTable = () => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchStockConsumedRecords();
    }
  }, [user]);

  const fetchStockConsumedRecords = async () => {
    try {
      if (!user?.id) return;
      const response = await axios.get(`${BASE_URL}/stock-consumed`, {
        params: { userid: user.id },
      });
      const sortedData = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setData(sortedData);
    } catch (error) {
      setError("Failed to load data");
      console.error("Error fetching stock-consumed records:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleView = (stock) => {
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
        setData((prevData) => prevData.filter((item) => item.id !== id));
        alert("Stock record deleted successfully!");
      }
    } catch (error) {
      alert("Failed to delete stock record.");
      console.error(
        "Error deleting stock record:",
        error.response?.data || error.message
      );
    }
  };

  const handleSave = (newData) => {
    setData((prevData) => [newData, ...prevData]);
  };

  const handleUpdate = (updatedStock) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === updatedStock.id ? updatedStock : item
      )
    );
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Stock Consumed Records", 20, 10);

    const tableColumn = [
      "Date",
      "Product Name",
      "Quantity",
      "Units",
      "Description",
    ];
    const tableRows = data.map((item) => [
      item.date,
      item.product,
      item.quantity_out,
      item.units,
      item.description,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("StockConsumedRecords.pdf");
  };

  const exportToExcel = () => {
    // Extract only the required fields
    const filteredData = data.map(
      ({ date, product, quantity_out, units, description }) => ({
        Date: date,
        "Product Name": product,
        Quantity: quantity_out,
        Units: units,
        Description: description,
      })
    );

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "StockConsumedData");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "StockConsumedRecords.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const columns = useMemo(
    () => [
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
      { Header: "Quantity", accessor: "quantity_out" },
      { Header: "Units", accessor: "units" },
      { Header: "Description", accessor: "description" },
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
        <h1 className="mb-4">Stock Consumed Records</h1>
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
        <div className="d-flex justify-content-end mb-3">
          <Button variant="primary" onClick={handleOpen}>
            Add Stock Consumed
          </Button>
        </div>

        <StockConsumedForm
          show={showModal}
          handleClose={handleClose}
          handleSave={handleSave}
        />

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <DataTable columns={columns} data={data} />
        )}

        <ViewStockConsumed
          show={showViewModal}
          handleClose={() => setShowViewModal(false)}
          stockConsumedData={selectedStock}
        />

        <EditStockConsumedModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          stockConsumedData={selectedStock}
          handleUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default StockConsumedTable;
