import React, { useState , bootstrap } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const AddSupplier = ({ onSave }) => {
    const [supplier, setSupplier] = useState({
      suppliername: '',
      mobile: '',
      email: '',
      address: '',
    });
  
    const handleChange = (e) => {
      setSupplier({
        ...supplier,
        [e.target.suppliername]: e.target.value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(supplier);
      setSupplier({ suppliername: '', mobile: '', email: '', address: '' });
      // Dismiss the modal after saving
      const modal = document.getElementById('addSupplier');
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    };
  
    return (
      <div className="modal fade" id="addSupplier" tabIndex="-1" aria-labelledby="addSupplierLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addSupplierLabel">Add Supplier</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Supplier Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="suppliername"
                    name="suppliername"
                    value={supplier.suppliername}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">Contact Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    value={supplier.mobile}
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
  