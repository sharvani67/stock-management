import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditAllocation = ({ show, handleClose, details, onSave }) => {
  const [formData, setFormData] = useState({
    siteName: "",
    manager: "",
    productName: "",
    stockOutward: 0,
    remainingStock: 0,
  });

  useEffect(() => {
    if (details) {
      setFormData({ ...details });
    }
  }, [details]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "stockOutward" || name === "remainingStock" ? parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Allocation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="siteName">
            <Form.Label>Site Name</Form.Label>
            <Form.Control
              type="text"
              name="siteName"
              value={formData.siteName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="manager">
            <Form.Label>Manager</Form.Label>
            <Form.Control
              type="text"
              name="manager"
              value={formData.manager}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="stockOutward">
            <Form.Label>Stock Outward</Form.Label>
            <Form.Control
              type="number"
              name="stockOutward"
              value={formData.stockOutward}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="remainingStock">
            <Form.Label>Remaining Stock</Form.Label>
            <Form.Control
              type="number"
              name="remainingStock"
              value={formData.remainingStock}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditAllocation;
