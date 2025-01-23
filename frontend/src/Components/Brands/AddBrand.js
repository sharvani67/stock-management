import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddBrandModal = ({ show, handleClose, handleSave }) => {
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (brandName && description) {
      handleSave({ brandName, description });
      handleClose(); // Close the modal after saving
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
