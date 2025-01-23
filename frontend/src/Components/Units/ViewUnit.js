import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewUnit = ({ show, handleClose, details }) => {
  return (
    <Modal show={show} onHide={handleClose} centered  className="view-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>View Unit Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {details ? (
          <div>
            <p><strong>Serial No:</strong> {details.serialNo}</p>
            <p><strong>Name:</strong> {details.name}</p>
            <p><strong>Short Name:</strong> {details.shortName}</p>
            <p><strong>Base Unit:</strong> {details.baseUnit}</p>
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewUnit;
