import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const StockModalPopup = ({ show, handleClose, title, details, onSave }) => {
  const [formData, setFormData] = useState({
    siteName: "",
    manager: "",
    productName: "",
    stockOutward: "",
    remainingStock: "",
    stockQuantity: "",
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
        stockQuantity: "",
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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {[
            { label: "Site Name", name: "siteName", type: "text" },
            { label: "Manager", name: "manager", type: "text" },
            { label: "Product Name", name: "productName", type: "text" },
            { label: "Stock Outward", name: "stockOutward", type: "number" },
            { label: "Remaining Stock", name: "remainingStock", type: "number" },
            { label: "Stock Quantity", name: "stockQuantity", type: "number" },
          ].map(({ label, name, type }) => (
            <Form.Group className="mb-3" key={name}>
              <Form.Label htmlFor={name}>{label}:</Form.Label>
              <Form.Control
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
              />
            </Form.Group>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default StockModalPopup;
