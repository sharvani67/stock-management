import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewAllocation = ({ show, handleClose, details }) => {
  if (!details) return null; // Avoid rendering if no details are passed

  return (
    <Modal show={show} onHide={handleClose} centered  className="view-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>View Allocation Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Site Name:</strong> {details.siteName}</p>
        <p><strong>Manager:</strong> {details.manager}</p>
        <p><strong>Product Name:</strong> {details.productName}</p>
        <p><strong>Stock Outward:</strong> {details.stockOutward}</p>
        <p><strong>Remaining Stock:</strong> {details.remainingStock}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewAllocation;
