import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditBrand = ({ brand, showModal, handleClose, handleSave }) => {
  // Initialize formData with default values for brandName and description
  const [formData, setFormData] = useState({
    brandName: "",
    description: "",
  });

  // Update formData when brand prop changes
  useEffect(() => {
    if (brand) {
      setFormData({
        brandName: brand.brandName,
        description: brand.description,
      });
    }
  }, [brand]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave({ ...brand, ...formData }); // Pass updated data to the save handler
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered className="edit-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>Edit Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="edit-form"> 
          {/* Brand Name Input */}
          <Form.Group controlId="brandName">
            <Form.Label>Brand Name</Form.Label>
            <Form.Control
              type="text"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Description Input */}
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Modal Footer with Close and Save Buttons */}
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

export default EditBrand;
