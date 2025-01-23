import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewSupplier = ({ show, handleClose, details }) => {
  return (
    <Modal show={show} onHide={handleClose} centered className="view-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>View Supplier</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Supplier Name:</strong> {details?.supplierName}</p>
        <p><strong>Contact:</strong> {details?.contact}</p>
        <p><strong>Address:</strong> {details?.address}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewSupplier;
