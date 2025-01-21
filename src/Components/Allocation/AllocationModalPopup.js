import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const StockModalPopup = ({ show, handleClose, title, details, onSave }) => {
  const [formData, setFormData] = useState({
    siteName: "",
    manager: "",
    productName: "",
    stockOutward: "",
    remainingStock: "",
    stockQuantity:"",
  });

  useEffect(() => {
    if (details) {
      setFormData(details);
    } else {
      setFormData({
        siteName: "",
        manager: "",
        productName: "",
        stockOutward: "",
        remainingStock: "",
        stockQuantity:"",
      });
    }
  }, [details]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    handleClose();
  };

  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row mb-3 align-items-center">
                <div className="col-4 text-end">
                  <label htmlFor="siteName" className="form-label">
                    Site Name:
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    id="siteName"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3 align-items-center">
                <div className="col-4 text-end">
                  <label htmlFor="manager" className="form-label">
                    Manager:
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    id="manager"
                    name="manager"
                    value={formData.manager}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3 align-items-center">
                <div className="col-4 text-end">
                  <label htmlFor="productName" className="form-label">
                    Product Name:
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3 align-items-center">
                <div className="col-4 text-end">
                  <label htmlFor="stockOutward" className="form-label">
                    Stock Outward:
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="number"
                    className="form-control"
                    id="stockOutward"
                    name="stockOutward"
                    value={formData.stockOutward}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3 align-items-center">
                <div className="col-4 text-end">
                  <label htmlFor="remainingStock" className="form-label">
                    Remaining Stock:
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="number"
                    className="form-control"
                    id="remainingStock"
                    name="remainingStock"
                    value={formData.remainingStock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3 align-items-center">
                <div className="col-4 text-end">
                  <label htmlFor="stockQuantity" className="form-label">
                    Stock Quantity:
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="number"
                    className="form-control"
                    id="stockQuantity"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StockModalPopup;
