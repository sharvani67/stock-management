import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddSiteForm = ({ addSite, showModal, handleClose }) => {
  const [siteCode, setSiteCode] = useState('');
  const [siteName, setSiteName] = useState('');
  const [inchargeName, setInchargeName] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [siteManager, setSiteManager] = useState('');
  const [inchargeMobile, setInchargeMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSite = {
      siteCode,
      siteName,
      inchargeName,
      location,
      city,
      state,
      siteManager,
      inchargeMobile,
    };

    addSite(newSite); // Function to add the site
    handleClose(); // Close the modal after submission

    // Clear form after submission
    setSiteCode('');
    setSiteName('');
    setInchargeName('');
    setLocation('');
    setCity('');
    setState('');
    setSiteManager('');
    setInchargeMobile('');
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Site</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="siteCode">
            <Form.Label>Site Code:</Form.Label>
            <Form.Control
              type="text"
              value={siteCode}
              onChange={(e) => setSiteCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="siteName">
            <Form.Label>Site Name:</Form.Label>
            <Form.Control
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="inchargeName">
            <Form.Label>Incharge Name:</Form.Label>
            <Form.Control
              type="text"
              value={inchargeName}
              onChange={(e) => setInchargeName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Location:</Form.Label>
            <Form.Control
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City:</Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="state">
            <Form.Label>State:</Form.Label>
            <Form.Control
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="siteManager">
            <Form.Label>Site Manager:</Form.Label>
            <Form.Control
              type="text"
              value={siteManager}
              onChange={(e) => setSiteManager(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="inchargeMobile">
            <Form.Label>Incharge Mobile:</Form.Label>
            <Form.Control
              type="text"
              value={inchargeMobile}
              onChange={(e) => setInchargeMobile(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Add Site
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddSiteForm;
