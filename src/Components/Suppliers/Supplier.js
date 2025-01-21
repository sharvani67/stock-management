import React, { useState } from "react";
import AddSupplierModal from "./AddSupplier";

const SupplierTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([
    { supplierName: "ABC Traders", contact: "123-456-7890", address: "New York" },
    { supplierName: "XYZ Supplies", contact: "987-654-3210", address: "San Francisco" },
  ]);

  const handleAddSupplier = (newSupplier) => {
    setData([...data, newSupplier]);
  };

  return (
    <div className="container mt-5">
      <h1>Suppliers</h1>
      <button
        className="btn btn-primary mb-4"
        onClick={() => setShowModal(true)}
      >
        + Add New Supplier
      </button>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Supplier Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((supplier, index) => (
            <tr key={index}>
              <td>{supplier.supplierName}</td>
              <td>{supplier.contact}</td>
              <td>{supplier.address}</td>
              <td>
                <button className="btn btn-info mr-2">
                  <i className="fas fa-eye"></i> View
                </button>
                <button className="btn btn-warning mr-2">
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn btn-danger">
                  <i className="fas fa-trash-alt"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding Supplier */}
      <AddSupplierModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleAddSupplier}
      />
    </div>
  );
};

export default SupplierTable;
