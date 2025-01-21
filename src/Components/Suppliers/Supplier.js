import React from 'react';
import AddSupplier from './AddSupplier';

const Supplier = () => {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Suppliers</h2>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addSupplierModal"
        >
          Add Supplier
        </button>
      </div>

      <table className="table table-striped table-responsive">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Supplier Name</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>+1234567890</td>
            <td>john@example.com</td>
            <td>123 Street, City</td>
            <td>
              <button className="btn btn-sm btn-info me-2">
                <i className="bi bi-pencil-square"></i>
              </button>
              <button className="btn btn-sm btn-danger me-2">
                <i className="bi bi-trash"></i>
              </button>
              <button className="btn btn-sm btn-success">
                <i className="bi bi-save"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Add Supplier Modal */}
      <AddSupplier />
    </div>
  );
};

export default Supplier;
