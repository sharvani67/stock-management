import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import '../../CSS/AddForm.css';
import axios from "axios";

const Addunit = ({ show, handleClose, title, details, onSave }) => {
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

  const handleSubmit = async () => {
    try {
      if (details) {
        // Update logic (if you implement an update endpoint in the future)
      } else {
        // Add a new unit
        await axios.post("http://localhost:5000/units", formData);
      }
       // Refresh the unit list after adding
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error saving unit:", error);
    }
  };
  
  
  

  return (
    <Modal show={show} onHide={handleClose} centered className="add-form-modal">
      <Modal.Header closeButton >
        <Modal.Title>Add New Unit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="serialNo">
            <Form.Label>Serial No:</Form.Label>
            <Form.Control
              type="text"
              name="serialNo"
              value={formData.serialNo}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="name" className="mt-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="shortName" className="mt-3">
            <Form.Label>Short Name:</Form.Label>
            <Form.Control
              type="text"
              name="shortName"
              value={formData.shortName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="baseUnit" className="mt-3">
            <Form.Label>Base Unit:</Form.Label>
            <Form.Control
              as="select"
              name="baseUnit"
              value={formData.baseUnit}
              onChange={handleChange}
              required
            >
              <option value="">Select Base Unit</option>
              <option value="Kilogram">Kilogram</option>
              <option value="Gram">Gram</option>
              <option value="Liter">Liter</option>
              <option value="Meter">Meter</option>
              <option value="Piece">Piece</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {details ? "Save Changes" : "Add Unit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Addunit;
