import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../ApiService/Api';

const EditUser = ({ user, showModal, handleClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    role: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!user || !user.id) {
      setErrorMessage("Invalid user data.");
      return;
    }

    try {
      // PUT request to update user
      const response = await axios.put(`${BASE_URL}/users/${user.id}`, formData);

      if (response.status === 200) {
        setSuccessMessage("User updated successfully!");
        setTimeout(() => {
          handleClose();
          window.location.reload(); // Refresh the page to reflect changes
        }, 1000);
      } else {
        setErrorMessage("Failed to update user. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error updating user. Please check the API.");
      console.error("Update error:", error);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered className="edit-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Form className="edit-form">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="mobile" className="mt-3">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="role" className="mt-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
          </Form.Group>
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

export default EditUser;
