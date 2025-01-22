import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ViewSite = ({ site, showModal, handleClose }) => {
  if (!site) {
    return null; // Prevent rendering if site is null
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>View Site Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Site Code:</strong> {site.siteCode}</p>
        <p><strong>Site Name:</strong> {site.siteName}</p>
        <p><strong>Incharge Name:</strong> {site.inchargeName}</p>
        <p><strong>Location:</strong> {site.location}</p>
        <p><strong>City:</strong> {site.city}</p>
        <p><strong>State:</strong> {site.state}</p>
        <p><strong>Site Manager:</strong> {site.siteManager}</p>
        <p><strong>Incharge Mobile:</strong> {site.inchargeMobile}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewSite;
