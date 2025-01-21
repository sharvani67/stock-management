import React, { useState } from 'react';

const AddSupplier = () => {
  const [supplier, setSupplier] = useState({
    name: '',
    contactNumber: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    setSupplier({
      ...supplier,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Supplier added:', supplier);
    // Add logic to save supplier data
    setSupplier({ name: '', contactNumber: '', email: '', address: '' });
  };

  return (
    <div className="modal fade" id="addSupplierModal" tabIndex="-1" aria-labelledby="addSupplierModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addSupplierModalLabel">Add Supplier</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Supplier Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={supplier.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="contactNumber"
                  name="contactNumber"
                  value={supplier.contactNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={supplier.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  rows="3"
                  value={supplier.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSupplier;
