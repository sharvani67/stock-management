import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { BASE_URL } from '../../ApiService/Api';

const EditSiteForm = ({ site, updateSite, showModal, handleClose }) => {
  const [users, setUsers] = useState([]);
  const [userMobileMap, setUserMobileMap] = useState({});
  const [userIdNameMap, setUserIdNameMap] = useState({});
  const [siteDetails, setSiteDetails] = useState({
    siteCode: '',
    siteName: '',
    location: '',
    city: '',
    state: '',
    siteManager: '',
    managerMobile: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users`);
        if (response.ok) {
          const data = await response.json();
          setUsers(data);

          const mobileMap = {};
          const idNameMap = {};
          data.forEach((user) => {
            mobileMap[user.id] = user.mobile;
            idNameMap[user.id] = user.name;
          });
          setUserMobileMap(mobileMap);
          setUserIdNameMap(idNameMap);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (site) {
      setSiteDetails({
        siteCode: site.siteCode,
        siteName: site.siteName,
        location: site.location,
        city: site.city,
        state: site.state,
        siteManager: site.siteManager, 
        managerMobile: site.managerMobile || '',
      });
    }
  }, [site]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSiteDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSiteManagerChange = (e) => {
    const selectedUserId = e.target.value;
    setSiteDetails((prev) => ({
      ...prev,
      siteManager: selectedUserId,
      managerMobile: userMobileMap[selectedUserId] || '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedSite = {
        siteCode: siteDetails.siteCode,
        siteName: siteDetails.siteName,
        location: siteDetails.location,
        city: siteDetails.city,
        state: siteDetails.state,
        siteManager: siteDetails.siteManager,  // Ensuring we send the userId
        managerMobile: siteDetails.managerMobile
    };

    try {
        const response = await fetch(`${BASE_URL}/sites/${site.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedSite),
        });

        if (response.ok) {
            updateSite(updatedSite);  // Update the UI
            handleClose();
        } else {
            console.error('Failed to update site');
        }
    } catch (error) {
        console.error('Error updating site:', error);
    }
};


  return (
    <Modal show={showModal} onHide={handleClose} centered className="edit-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>Edit Site</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="siteCode">
                <Form.Label>Site Code</Form.Label>
                <Form.Control type="text" name="siteCode" value={siteDetails.siteCode} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="siteName">
                <Form.Label>Site Name</Form.Label>
                <Form.Control type="text" name="siteName" value={siteDetails.siteName} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" name="location" value={siteDetails.location} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name="city" value={siteDetails.city} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" name="state" value={siteDetails.state} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="siteManager">
                <Form.Label>Site Manager</Form.Label>
                <Form.Select name="siteManager" value={siteDetails.siteManager} onChange={handleSiteManagerChange} required>
                  <option value="">Select a Site Manager</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="managerMobile">
                <Form.Label>Manager Mobile</Form.Label>
                <Form.Control type="text" name="managerMobile" value={siteDetails.managerMobile} readOnly />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={6} className="text-center">
              <Button variant="primary" type="submit" className="mt-3 w-100">
                Save Changes
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditSiteForm;
