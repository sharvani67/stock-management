import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from '../../ApiService/Api';

const ModalPopup = ({ user, showModal, handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    role: "",
    password: "",
  });

  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        role: user.role,
        password: user.password,
      });
    } else {
      setFormData({
        name: "",
        mobile: "",
        email: "",
        role: "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Fetch existing users to check for duplicate email
      const response = await axios.get(`${BASE_URL}/users`);
      const users = response.data;

      // Check if the entered email already exists
      const isEmailExists = users.some(existingUser => existingUser.email === formData.email);

      if (isEmailExists) {
        setAlertMessage("Email ID already exists. Please use a different email.");
        return;
      }

      if (user) {
        // Update logic can be added here
      } else {
        await axios.post(`${BASE_URL}/users`, formData);
      }
      
      handleClose(); // Close the modal
      window.location.reload();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered className="add-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>{user ? "Edit User" : "Add New User"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alertMessage && <Alert variant="danger">{alertMessage}</Alert>}
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="mobile" className="mt-3">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter mobile number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="role" className="mt-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {user ? "Save Changes" : "Add User"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPopup;
