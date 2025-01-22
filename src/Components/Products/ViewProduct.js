import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewProduct = ({ product, showModal, handleClose }) => {
  if (!product) {
    return null; // Prevent rendering if product is null
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>View Product Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Product Name:</strong> {product.name}</p>
        <p><strong>Description:</strong> {product.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewProduct;
