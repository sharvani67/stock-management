import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditProduct = ({ show, handleClose, product, handleSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Set initial values when the modal opens
  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      id: product.id,
      name,
      description,
    };
    handleSave(updatedProduct);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          
          <Form.Group controlId="productDescription" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProduct;
