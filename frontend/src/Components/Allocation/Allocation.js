import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "../../layout/DataTable";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import ViewAllocation from "./ViewAllocation";
import EditAllocation from "./EditAllocation";
import StockModalPopup from "./AddAllocation";

const AllocationTable = () => {
  const [viewModalShow, setViewModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false); // For StockModalPopup
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalTitle, setModalTitle] = useState(""); // Title for StockModalPopup
  const [data, setData] = useState([
    { siteName: "Site 1", manager: "Manager 1", productName: "Product 1", stockOutward: 50, remainingStock: 100 },
    { siteName: "Site 2", manager: "Manager 2", productName: "Product 2", stockOutward: 30, remainingStock: 120 },
    { siteName: "Site 3", manager: "Manager 3", productName: "Product 3", stockOutward: 20, remainingStock: 80 },
  ]);

  // Handlers for View Modal
  const handleOpenViewModal = (row) => {
    setSelectedRow(row);
    setViewModalShow(true);
  };
  const handleCloseViewModal = () => setViewModalShow(false);

  // Handlers for Edit Modal
  const handleOpenEditModal = (row) => {
    setSelectedRow(row);
    setEditModalShow(true);
  };
  const handleCloseEditModal = () => {
    setEditModalShow(false);
    setSelectedRow(null);
  };

  // Handlers for Stock Modal Popup
  const handleOpenStockModal = () => {
    setSelectedRow(null);
    setModalTitle("Add New Allocation");
    setModalShow(true);
  };
  const handleCloseStockModal = () => setModalShow(false);

  const handleSaveStock = (newData) => {
    setData((prev) => [...prev, newData]);
    handleCloseStockModal();
  };

  // Save Edited Data
  const handleSaveEdit = (updatedData) => {
    setData((prev) =>
      prev.map((item) =>
        item.siteName === updatedData.siteName && item.productName === updatedData.productName ? updatedData : item
      )
    );
    handleCloseEditModal();
  };

  // Delete Data
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
            onClick={() => handleOpenViewModal(row.original)}
          >
            <FaEye />
          </Button>
          <Button
            variant="outline-warning"
            size="sm"
            title="Edit"
            onClick={() => handleOpenEditModal(row.original)}
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

      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" className='add-button' onClick={handleOpenStockModal}>
          <FaPlus className="me-2" />
          Add New Allocation
        </Button>
      </div>

      <div className="table-wrapper">
        <DataTable columns={columns} data={data} />
      </div>

      {/* View Modal */}
      <ViewAllocation
        show={viewModalShow}
        handleClose={handleCloseViewModal}
        details={selectedRow}
      />

      {/* Edit Modal */}
      <EditAllocation
        show={editModalShow}
        handleClose={handleCloseEditModal}
        details={selectedRow}
        onSave={handleSaveEdit}
      />

      {/* Stock Modal Popup */}
      <StockModalPopup
        show={modalShow}
        handleClose={handleCloseStockModal}
        title={modalTitle}
        details={selectedRow}
        onSave={handleSaveStock}
      />
    </div>
  );
};

export default AllocationTable;
