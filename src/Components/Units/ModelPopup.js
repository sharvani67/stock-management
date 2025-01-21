import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ModalPopup = ({ show, handleClose, title, details, onSave }) => {
  const [formData, setFormData] = useState({
    serialNo: "",
    name: "",
    shortName: "",
    baseUnit: "",
  });

  useEffect(() => {
    // Populate form data if editing or viewing an item
    if (details) {
      setFormData(details);
    } else {
      setFormData({
        serialNo: "",
        name: "",
        shortName: "",
        baseUnit: "",
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
                  <label htmlFor="serialNo" className="form-label">
                    Serial No:
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    id="serialNo"
                    name="serialNo"
                    value={formData.serialNo}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3 align-items-center">
                <div className="col-4 text-end">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3 align-items-center">
                <div className="col-4 text-end">
                  <label htmlFor="shortName" className="form-label">
                    Short Name:
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    id="shortName"
                    name="shortName"
                    value={formData.shortName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3 align-items-center">
                <div className="col-4 text-end">
                  <label htmlFor="baseUnit" className="form-label">
                    Base Unit:
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    id="baseUnit"
                    name="baseUnit"
                    value={formData.baseUnit}
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

export default ModalPopup;
