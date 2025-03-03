import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import '../../CSS/EditForm.css'

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
    <Modal show={show} onHide={handleClose} centered className="edit-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="edit-form">
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

export default EditProduct;
