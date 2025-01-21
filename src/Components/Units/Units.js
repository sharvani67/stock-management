import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ModalPopup from "./ModelPopup";

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

  return (
    <div className="container mt-4">
      {/* Title and Add New Button */}
      <div>
        <h2>Unit Table</h2>
        <div className="text-end mb-3">
          <button
            className="btn btn-success"
            onClick={() => handleOpenModal("Add New")}
          >
            <i className="fas fa-plus me-2"></i>Add New Unit
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Serial No</th>
              <th>Name</th>
              <th>Short Name</th>
              <th>Base Unit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.serialNo}</td>
                <td>{item.name}</td>
                <td>{item.shortName}</td>
                <td>{item.baseUnit}</td>
                <td>
                  <button
                    className="btn btn-link text-primary me-2"
                    title="View"
                    onClick={() => handleOpenModal("View", item)}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-link text-warning me-2"
                    title="Edit"
                    onClick={() => handleOpenModal("Edit", item)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-link text-danger"
                    title="Delete"
                    onClick={() => handleOpenModal("Delete", item)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Popup */}
      <ModalPopup
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
