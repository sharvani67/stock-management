import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddProduct = ({ onAddProduct }) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (productName && description) {
      onAddProduct({ name: productName, description });
      setProductName("");
      setDescription("");
      setShowModal(false); // Close modal after adding the product
    }
  };

  return (
    <>
      <Button variant="success" onClick={() => setShowModal(true)} className="mb-3">
        Add Product
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProduct}>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="description" className="mt-3">
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
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Add Product
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddProduct;
