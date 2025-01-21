import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "../../layout/DataTable";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import StockModalPopup from "./AllocationModalPopup";

const AllocationTable = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([
    { siteName: "Site 1", manager: "Manager 1", productName: "Product 1", stockOutward: 50, remainingStock: 100 },
    { siteName: "Site 2", manager: "Manager 2", productName: "Product 2", stockOutward: 30, remainingStock: 120 },
    { siteName: "Site 3", manager: "Manager 3", productName: "Product 3", stockOutward: 20, remainingStock: 80 },
  ]);

  const handleOpenModal = (action, item = null) => {
    setModalTitle(action === "Add New" ? "Add New Allocation" : `${action} Allocation`);
    setSelectedRow(item);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setSelectedRow(null);
    setModalTitle("");
  };

  const handleSave = (newData) => {
    if (selectedRow) {
      // Update existing row
      setData((prev) =>
        prev.map((item) =>
          item.siteName === newData.siteName && item.productName === newData.productName ? { ...newData } : item
        )
      );
    } else {
      // Add new row
      setData((prev) => [...prev, newData]);
    }
  };

  const handleDelete = (row) => {
    const updatedData = data.filter(
      (item) => !(item.siteName === row.siteName && item.productName === row.productName)
    );
    setData(updatedData);
  };

  const columns = [
    { Header: "Site Name", accessor: "siteName" },
    { Header: "Manager", accessor: "manager" },
    { Header: "Product Name", accessor: "productName" },
    { Header: "Stock Outward", accessor: "stockOutward" },
    { Header: "Remaining Stock", accessor: "remainingStock" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="outline-info"
            size="sm"
            title="View"
            onClick={() => handleOpenModal("View", row.original)}
          >
            <FaEye />
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            title="Edit"
            onClick={() => handleOpenModal("Edit", row.original)}
          >
            <FaEdit />
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            title="Delete"
            onClick={() => handleDelete(row.original)}
          >
            <FaTrashAlt />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Allocations Management</h1>

      {/* Add New Allocation Button */}
      <div className="d-flex justify-content-end mb-3">
        <Button variant="success" onClick={() => handleOpenModal("Add New")}>
          <FaPlus className="me-2" />
          Add New Allocation
        </Button>
      </div>

      {/* Table Wrapper */}
      <div className="table-wrapper">
        <DataTable columns={columns} data={data} />
      </div>

      {/* Modal Popup */}
      <StockModalPopup
        show={modalShow}
        handleClose={handleCloseModal}
        title={modalTitle}
        details={selectedRow}
        onSave={handleSave}
      />
    </div>
  );
};

export default AllocationTable;
