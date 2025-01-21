import React, { useState, bootstrap } from "react";

const AddProduct = ({ onAddProduct }) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (productName && description) {
      // Pass new product to parent
      onAddProduct({ name: productName, description });
      // Reset form fields
      setProductName("");
      setDescription("");
      // Close modal
      const modal = document.getElementById("addProductModal");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    }
  };

  return (
    <div>
      {/* Add Product Button */}
      <button
        type="button"
        className="btn btn-success mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addProductModal"
      >
        Add Product
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="addProductModal"
        tabIndex="-1"
        aria-labelledby="addProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProductModalLabel">
                Add New Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleAddProduct}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
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
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
