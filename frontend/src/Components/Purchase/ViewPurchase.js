import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewPurchase = ({ show, handleClose, details }) => {
  if (!details) return null;

  return (
    <Modal show={show} onHide={handleClose} centered  className="view-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>View Purchase</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p><strong>S.No:</strong> {details.sNo}</p>
          <p><strong>Stock Name:</strong> {details.productName}</p>
          <p><strong>Quantity:</strong> {details.quantity} {details.units}</p>
          <p><strong>Price:</strong> ${details.price}</p>
          <p><strong>Supplier Name:</strong> {details.supplierName}</p>
          <p><strong>Brand Name:</strong> {details.brandName}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewPurchase;
