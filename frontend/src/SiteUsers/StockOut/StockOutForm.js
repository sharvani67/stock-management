import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

const StockOutModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    destinationSite: "",
    productName: "",
    brandName:"",
    quantity_out: "",
    units: "",
    attachment: null,
    status: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
            "http://localhost:5000/stock-out",
            formData
        );
        alert(response.data.message);
    } catch (error) {
        console.error("Error adding stock:", error);
        alert("Failed to add stock.");
    }
};

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header className="bg-primary text-white" closeButton>
        <Modal.Title>Stock Out Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
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

            {/* Destination Site */}
            <Col md={6}>
              <Form.Group controlId="formDestinationSite">
                <Form.Label>Destination Site</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter destination site"
                  name="destinationSite"
                  value={formData.destinationSite}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            {/* Product Name */}
            <Col md={6}>
              <Form.Group controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  as="select"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Product</option>
                  <option value="Cement">Cement</option>
                  <option value="Bricks">Bricks</option>
                  <option value="Paints">Paints</option>
                </Form.Control>
              </Form.Group>
            </Col>

            {/* Brand Name */}
            <Col md={6}>
              <Form.Group controlId="formBrandName">
                <Form.Label>Brand Name</Form.Label>
                <Form.Control
                  as="select"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Brand</option>
                  <option value="Brand A">Brand A</option>
                  <option value="Brand B">Brand B</option>
                  <option value="Brand C">Brand C</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            {/* Quantity */}
            <Col md={6}>
              <Form.Group controlId="formQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter quantity"
                  name="quantity_out"
                  value={formData.quantity_out}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            {/* Units */}
            <Col md={6}>
              <Form.Group controlId="formUnits">
                <Form.Label>Units</Form.Label>
                <Form.Control
                  as="select"
                  name="units"
                  value={formData.units}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Unit</option>
                  <option value="Kgs">Kgs</option>
                  <option value="Pieces">Pieces</option>
                  <option value="Bags">Bags</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            {/* Status */}
            <Col md={6}>
              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select status</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Control>
              </Form.Group>
            </Col>

            {/* Attachment */}
            <Col md={6}>
              <Form.Group controlId="formAttachment">
                <Form.Label>Attachment</Form.Label>
                <Form.Control
                  type="file"
                  name="attachment"
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

export default StockOutModal;
