import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { BASE_URL } from "../../ApiService/Api";

const AddProductModal = ({ show, handleClose, handleSave }) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (productName && description) {
      // Make POST request to the backend
      try {
        const response = await fetch(`${BASE_URL}/api/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productName, description }),
        });

        const result = await response.json();
        if (response.ok) {
          handleSave({ productName, description });
          handleClose(); // Close the modal after saving
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error adding product:", error);
        
      }
    } else {
      alert("Please fill all fields.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="add-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
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

export default AddProductModal;
