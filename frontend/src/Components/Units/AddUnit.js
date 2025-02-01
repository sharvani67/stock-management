import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import '../../CSS/AddForm.css';
import axios from "axios";
import { BASE_URL } from "../../ApiService/Api";

const AddUnit = ({ show, handleClose, title, details, handleSave }) => {
  const [formData, setFormData] = useState({
    serialNo: "",
    name: "",
    shortName: "",
    baseUnit: "",
  });

  useEffect(() => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (details) {
        // Update logic
        response = await axios.put(`${BASE_URL}/units/${details.id}`, formData);
      } else {
        // Add new unit
        response = await axios.post(`${BASE_URL}/units`, formData);
      }
      
      if (response.status === 200 || response.status === 201) {
        handleSave(response.data); // Pass saved data to parent
        handleClose(); // Close the modal
      }
    } catch (error) {
      console.error("Error saving unit:", error);
      alert("Failed to save unit. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="add-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>{details ? "Edit Unit" : "Add New Unit"}</Modal.Title>
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
              type="text"
              name="baseUnit"
              value={formData.baseUnit}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {details ? "Save Changes" : "Add Unit"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUnit;
