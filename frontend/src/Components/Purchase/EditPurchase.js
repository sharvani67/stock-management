import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditPurchase = ({ show, handleClose, details, onSave }) => {
  const [formData, setFormData] = useState({
    sNo: details?.sNo || "",
    productName: details?.productName || "",
    quantity: details?.quantity || "",
    units: details?.units || "",
    price: details?.price || "",
    supplierName: details?.supplierName || "",
    brandName: details?.brandName || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="edit-form-modal">
  <Modal.Header closeButton>
    <Modal.Title>Edit Purchase</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form className="edit-form">
      <Form.Group className="mb-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Units</Form.Label>
        <Form.Control
          type="text"
          name="units"
          value={formData.units}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Supplier Name</Form.Label>
        <Form.Control
          type="text"
          name="supplierName"
          value={formData.supplierName}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Brand Name</Form.Label>
        <Form.Control
          type="text"
          name="brandName"
          value={formData.brandName}
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSubmit}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>

  );
};

export default EditPurchase;
