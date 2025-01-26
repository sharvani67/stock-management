import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddBrandModal = ({ show, handleClose, handleSave }) => {
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (brandName && description) {
      // Make POST request to the backend
      try {
        const response = await fetch("http://localhost:5000/api/brands", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ brandName, description }),
        });

        const result = await response.json();
        if (response.ok) {
          handleSave({ brandName, description });
          handleClose(); // Close the modal after saving
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error adding brand:", error);
        alert("Failed to add brand.");
      }
    } else {
      alert("Please fill all fields.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="add-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add New Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="brandName">
            <Form.Label>Brand Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBrandModal;
