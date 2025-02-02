import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { BASE_URL } from '../../ApiService/Api';

const AddSiteForm = ({ addSite, showModal, handleClose }) => {
  const [users, setUsers] = useState([]);
  const [siteCode, setSiteCode] = useState('');
  const [siteName, setSiteName] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [siteManager, setSiteManager] = useState('');
  const [managerMobile, setManagerMobile] = useState('');
  const [userMobileMap, setUserMobileMap] = useState({});
  const [userIdNameMap, setUserIdNameMap] = useState({}); // New map for ID to name

  const handleAddSite = async (newSite) => {
    try {
      const response = await fetch(`${BASE_URL}/sites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSite),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('New site added:', data);
      } else {
        console.error('Failed to add site');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users`);
        if (response.ok) {
          const data = await response.json();
          setUsers(data);

          // Create a map of user IDs to names and mobile numbers
          const mobileMap = data.reduce((acc, user) => {
            acc[user.id] = user.mobile;
            return acc;
          }, {});
          const idNameMap = data.reduce((acc, user) => {
            acc[user.id] = user.name;
            return acc;
          }, {});

          setUserMobileMap(mobileMap);
          setUserIdNameMap(idNameMap);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);


  const handleSiteManagerChange = (e) => {
    const selectedUserId = e.target.value; // Get selected user ID
    setSiteManager(selectedUserId); // Store the user ID
    setManagerMobile(userMobileMap[selectedUserId] || ''); // Autofill mobile number
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const newSite = {
      siteCode,
      siteName,
      location,
      city,
      state,
      siteManager: userIdNameMap[siteManager], // Map user ID to the name
    managerMobile,
    userId: siteManager, // Send user ID
    };

    handleAddSite(newSite);
    handleClose();
    window.location.reload(); //Refreshing page

    setSiteCode('');
    setSiteName('');
    setLocation('');
    setCity('');
    setState('');
    setSiteManager('');
    setManagerMobile('');
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered className="add-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add New Site</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="siteCode">
                <Form.Label>Site Code:</Form.Label>
                <Form.Control
                  type="text"
                  value={siteCode}
                  onChange={(e) => setSiteCode(e.target.value)}
                  placeholder="Enter site code"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="siteName">
                <Form.Label>Site Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="Enter site name"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="location">
                <Form.Label>Location:</Form.Label>
                <Form.Control
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="city">
                <Form.Label>City:</Form.Label>
                <Form.Control
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="state">
                <Form.Label>State:</Form.Label>
                <Form.Control
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Enter state"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="siteManager">
                <Form.Label>Site Manager Name:</Form.Label>
                <InputGroup>
                  <Form.Select
                    name="siteManager"
                    value={siteManager}
                    onChange={handleSiteManagerChange}
                    required
                  >
                    <option value="">Select a Site Manager</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </Form.Group>

            </Col>
            <Col md={6}>
              <Form.Group controlId="managerMobile">
                <Form.Label>Site Manager Contact:</Form.Label>
                <Form.Control
                  type="text"
                  value={managerMobile}
                  onChange={(e) => setManagerMobile(e.target.value)} // Allow manual editing if needed
                  placeholder="Enter contact number"
                  required
                  readOnly // Optional: Make it readonly if it should not be edited
                />
              </Form.Group>

            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={6} className="text-center">
              <Button variant="primary" type="submit" className="mt-3 w-100">
                Add Site
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddSiteForm;
