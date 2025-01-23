import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "../../layout/DataTable";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import AddSupplierModal from "./AddSupplier";
import ViewSupplier from "./ViewSupplier";
import EditSupplier from "./EditSupplier";

const SupplierTable = () => {
  const [modalShow, setModalShow] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([
    { supplierName: "ABC Traders", contact: "123-456-7890", address: "New York" },
    { supplierName: "XYZ Supplies", contact: "987-654-3210", address: "San Francisco" },
  ]);

  const handleOpenModal = (action, item = null) => {
    if (action === "View") {
      setSelectedRow(item);
      setViewShow(true);
    } else if (action === "Edit") {
      setSelectedRow(item);
      setEditShow(true);
    } else {
      setModalTitle("Add New Supplier");
      setModalShow(true);
    }
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setViewShow(false);
    setEditShow(false);
    setSelectedRow(null);
  };

  const handleSave = (newData) => {
    if (selectedRow) {
      setData((prev) =>
        prev.map((item) =>
          item.supplierName === newData.supplierName ? { ...newData } : item
        )
      );
    } else {
      setData((prev) => [...prev, newData]);
    }
  };

  const handleDelete = (row) => {
    const updatedData = data.filter(
      (item) => item.supplierName !== row.supplierName
    );
    setData(updatedData);
  };

  const columns = [
    { Header: "Supplier Name", accessor: "supplierName" },
    { Header: "Contact", accessor: "contact" },
    { Header: "Address", accessor: "address" },
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
            variant="outline-warning"
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
      <h1 className="mb-4">Suppliers Management</h1>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" className='add-button' onClick={() => handleOpenModal("Add New")}>
          <FaPlus className="me-2" />
          Add New Supplier
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
      <AddSupplierModal
        show={modalShow}
        handleClose={handleCloseModal}
        title={modalTitle}
        details={selectedRow}
        onSave={handleSave}
      />
      <ViewSupplier
        show={viewShow}
        handleClose={handleCloseModal}
        details={selectedRow}
      />
      <EditSupplier
        show={editShow}
        handleClose={handleCloseModal}
        details={selectedRow}
        onSave={handleSave}
      />
    </div>
  );
};

export default SupplierTable;
