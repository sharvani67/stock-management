import React, { useState,bootstrap } from "react";

const AddBrand = ({ onAddBrand }) => {
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddBrand = (e) => {
    e.preventDefault();
    if (brandName && description) {
      // Pass new brand to parent
      onAddBrand({ name: brandName, description });
      // Reset form fields
      setBrandName("");
      setDescription("");
      // Close modal
      const modal = document.getElementById("addBrandModal");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    }
  };

  return (
    <div>
      {/* Add Brand Button */}
      <button
        type="button"
        className="btn btn-success mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addBrandModal"
      >
        Add Brand
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="addBrandModal"
        tabIndex="-1"
        aria-labelledby="addBrandModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addBrandModalLabel">
                Add New Brand
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleAddBrand}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="brandName" className="form-label">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="brandName"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
