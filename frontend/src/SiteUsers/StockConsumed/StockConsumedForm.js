import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const StockConsumedForm = ({ show, handleClose, handleSubmit }) => {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    units: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    handleSubmit(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header className="bg-primary text-white" closeButton>
        <Modal.Title>Stock Consumed Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitForm}>
          <Row className="mb-3">
            {/* Product Name */}
            <Col md={6}>
              <Form.Group controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            {/* Quantity */}
            <Col md={6}>
              <Form.Group controlId="formQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            {/* Units */}
            <Col md={6}>
              <Form.Group controlId="formUnits">
                <Form.Label>Units</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter units (e.g., kg, pcs)"
                  name="units"
                  value={formData.units}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            {/* Date */}
            <Col md={6}>
              <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            {/* Description */}
            <Col md={12}>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default StockConsumedForm;
