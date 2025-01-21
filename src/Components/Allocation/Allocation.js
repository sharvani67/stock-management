import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
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
    setModalTitle(action === "Add New" ? "Add New Stock" : `${action} Stock`);
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

  return (
    <div className="container mt-4">
      <div>
        <h2>Allocations Table</h2>
        <div className="text-end mb-3">
          <button
            className="btn btn-success"
            onClick={() => handleOpenModal("Add New")}
          >
            <i className="fas fa-plus me-2"></i>Add New Allocation
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Site Name</th>
              <th>Manager</th>
              <th>Product Name</th>
              <th>Stock Outward</th>
              <th>Remaining Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.siteName}</td>
                <td>{item.manager}</td>
                <td>{item.productName}</td>
                <td>{item.stockOutward}</td>
                <td>{item.remainingStock}</td>
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
