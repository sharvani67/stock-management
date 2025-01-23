import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ViewUser = ({ user, showModal, handleClose }) => {
  return (
    <Modal show={showModal} onHide={handleClose} centered  className="view-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>View User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user ? (
          <div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Mobile:</strong> {user.mobile}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        ) : (
          <p>No user data available.</p>
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

export default ViewUser;
