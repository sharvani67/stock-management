import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import DataTable from "../../layout/DataTable";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import ViewAllocation from "./ViewAllocation";
import EditAllocation from "./EditAllocation";
import StockModalPopup from "./AddAllocation";
import Sidebar from "../../Shared/SideBar/SideBar";
import { BASE_URL } from '../../ApiService/Api'

const AllocationTable = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [viewModalShow, setViewModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false); // For StockModalPopup
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalTitle, setModalTitle] = useState(""); // Title for StockModalPopup
  const [data, setData] = useState([]);

  // Fetch Data from Backend
  const fetchAllocations = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/allocations`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching allocations:", error);
    }
  };

  useEffect(() => {
    fetchAllocations();
  }, []);

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

  const handleSaveStock = async (newData) => {
    try {
      await axios.post(`${BASE_URL}/allocations`, newData);
      fetchAllocations(); // Refresh table after adding
      handleCloseStockModal();
    } catch (error) {
      console.error("Error adding allocation:", error);
    }
  };

  // Save Edited Data
  const handleSaveEdit = (updatedData) => {
    // Logic for saving edited data goes here
    // Backend should be updated with a PUT/POST endpoint for this
  };

  // Delete Data
  const handleDelete = (row) => {
    // Logic for deleting data goes here
    // Backend should be updated with a DELETE endpoint for this
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
    <div className="admintablelayoutContainer">
    <Sidebar onToggleSidebar={setCollapsed} />
    <div className={`admintablelayout ${collapsed ? "collapsed" : ""}`}>
    
    <div className="container mt-5">
      <h1 className="mb-4">Allocations Management</h1>

      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" className="add-button" onClick={handleOpenStockModal}>
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
    </div>
    </div>
  );
};

export default AllocationTable;
