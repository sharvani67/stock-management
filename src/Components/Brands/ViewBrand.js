import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewBrand = ({ brand, showModal, handleClose }) => {
  if (!brand) {
    return null; // Prevent rendering if brand is null
  }

  return (
    <Modal show={showModal} onHide={handleClose} centered className="view-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>View Brand Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Brand Name:</strong> {brand.brandName}</p>
        <p><strong>Description:</strong> {brand.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewBrand;
