import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const EditSite = ({ site, updateSite, showModal, handleClose }) => {
  const [siteDetails, setSiteDetails] = useState({
    siteCode: '',
    siteName: '',
    inchargeName: '',
    location: '',
    city: '',
    state: '',
    siteManager: '',
    inchargeMobile: '',
  });

  // Populate the form with the selected site's data when the modal is opened
  useEffect(() => {
    if (site) {
      setSiteDetails({
        siteCode: site.site_code, // Make sure you're using the correct key based on your data
        siteName: site.site_name,
        inchargeName: site.incharge_name,
        location: site.location,
        city: site.city,
        state: site.state,
        siteManager: site.site_manager,
        inchargeMobile: site.incharge_mobile,
      });
    }
  }, [site]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSiteDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    updateSite(siteDetails); // Update the site with new details
    handleClose(); // Close the modal
  };

  return (
    <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false} centered className="edit-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>Edit Site</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="edit-form">
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formSiteCode">
                <Form.Label>Site Code</Form.Label>
                <Form.Control
                  type="text"
                  name="siteCode"
                  value={siteDetails.siteCode}
                  onChange={handleChange}
                  placeholder="Enter Site Code"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formSiteName">
                <Form.Label>Site Name</Form.Label>
                <Form.Control
                  type="text"
                  name="siteName"
                  value={siteDetails.siteName}
                  onChange={handleChange}
                  placeholder="Enter Site Name"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formInchargeName">
                <Form.Label>Incharge Name</Form.Label>
                <Form.Control
                  type="text"
                  name="inchargeName"
                  value={siteDetails.inchargeName}
                  onChange={handleChange}
                  placeholder="Enter Incharge Name"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formInchargeMobile">
                <Form.Label>Incharge Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="inchargeMobile"
                  value={siteDetails.inchargeMobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={siteDetails.location}
                  onChange={handleChange}
                  placeholder="Enter Location"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={siteDetails.city}
                  onChange={handleChange}
                  placeholder="Enter City"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={siteDetails.state}
                  onChange={handleChange}
                  placeholder="Enter State"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formSiteManager">
                <Form.Label>Site Manager</Form.Label>
                <Form.Control
                  type="text"
                  name="siteManager"
                  value={siteDetails.siteManager}
                  onChange={handleChange}
                  placeholder="Enter Site Manager"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSite;
