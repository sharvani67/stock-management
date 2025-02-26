import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { BASE_URL } from '../../ApiService/Api';

const EditSite = ({ site, updateSite, showModal, handleClose }) => {
  const [users, setUsers] = useState([]);
  const [userMobileMap, setUserMobileMap] = useState({});
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
          console.log("data",data);

          const mobileMap = data.reduce((acc, user) => {
            acc[user.id] = user.mobile;
            return acc;
          }, {});

          setUserMobileMap(mobileMap);
        } else {
          console.error('Failed to fetch users');
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
        siteId: site.id || "",  // Ensure siteId is included
        siteCode: site.siteCode || "",
        siteName: site.siteName || "",
        location: site.location || "",
        city: site.city || "",
        state: site.state || "",
        siteManager: site.siteManager || "",
        managerMobile: site.managerMobile || "",
        userId: site.userId || "", // Ensure userId is included
      });
    }
  }, [site]);
  
  console.log("site",site);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSiteDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSiteManagerChange = (e) => {
    const selectedUserId = e.target.value;
    const selectedUser = users.find(user => user.id.toString() === selectedUserId);
  
    setSiteDetails((prev) => ({
      ...prev,
      siteManager: selectedUser ? selectedUser.name : "", // Store manager name
      managerMobile: selectedUser ? selectedUser.mobile : "",
      userId: selectedUserId, // Store manager ID
    }));
  };
  
  
  const handleSubmit = async () => {
    const { siteId, ...updatedSiteDetails } = siteDetails; // Exclude siteId from request body
  
    try {
      const response = await fetch(`${BASE_URL}/update-site/${siteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSiteDetails),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        updateSite(siteDetails);
        handleClose();
      } else {
        console.error("Error updating site:", result.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  
  

  return (
    <Modal show={showModal} onHide={handleClose} centered className="edit-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>Edit Site</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="siteCode">
                <Form.Label>Site Code</Form.Label>
                <Form.Control
                  type="text"
                  name="siteCode"
                  value={siteDetails.siteCode}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="siteName">
                <Form.Label>Site Name</Form.Label>
                <Form.Control
                  type="text"
                  name="siteName"
                  value={siteDetails.siteName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={siteDetails.location}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={siteDetails.city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={siteDetails.state}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="siteManager">
                <Form.Label>Site Manager Name</Form.Label>
                <InputGroup>
                <Form.Select
  name="userId"
  value={siteDetails.userId}  // Store manager ID
  onChange={handleSiteManagerChange}
  required
>
  <option value="">Select a Site Manager</option>
  {users.map((user) => (
    <option key={user.id} value={user.id}>{user.name}</option>
  ))}
</Form.Select>

                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="managerMobile">
                <Form.Label>Site Manager Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="managerMobile"
                  value={siteDetails.managerMobile}
                  onChange={handleChange}
                  readOnly
                />
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

export default EditSite;
