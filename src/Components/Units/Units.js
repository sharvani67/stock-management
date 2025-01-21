import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "../../layout/DataTable";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import Addunit from "./ModelPopup";

const UnitTable = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([
    { serialNo: 1, name: "Item 1", shortName: "I1", baseUnit: "kg" },
    { serialNo: 2, name: "Item 2", shortName: "I2", baseUnit: "litre" },
    { serialNo: 3, name: "Item 3", shortName: "I3", baseUnit: "meter" },
  ]);

  const handleOpenModal = (action, item = null) => {
    setModalTitle(action === "Add New" ? "Add New Item" : `${action} Item`);
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
          item.serialNo === newData.serialNo ? { ...newData } : item
        )
      );
    } else {
      // Add new row
      setData((prev) => [...prev, { ...newData, serialNo: prev.length + 1 }]);
    }
  };

  const columns = [
    { Header: "Serial No", accessor: "serialNo" },
    { Header: "Name", accessor: "name" },
    { Header: "Short Name", accessor: "shortName" },
    { Header: "Base Unit", accessor: "baseUnit" },
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
            onClick={() => handleOpenModal("Delete", row.original)}
          >
            <FaTrashAlt />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Unit Management</h1>

      {/* Add New Unit Button */}
      <div className="d-flex justify-content-end mb-3">
        <Button variant="success" onClick={() => handleOpenModal("Add New")}>
          <FaPlus className="me-2" />
          Add New Unit
        </Button>
      </div>

      {/* Table Wrapper */}
      <div className="table-wrapper">
        <DataTable columns={columns} data={data} />
      </div>

      {/* Modal Popup */}
      <Addunit
        show={modalShow}
        handleClose={handleCloseModal}
        title={modalTitle}
        details={selectedRow}
        onSave={handleSave}
      />
    </div>
  );
};

export default UnitTable;
