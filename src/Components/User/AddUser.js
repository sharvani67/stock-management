import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalPopup = ({ user, showModal, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    role: "",
  });

  // If user is passed (for edit), pre-fill the form with the user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        role: user.role,
      });
    } else {
      // Clear form data for adding a new user
      setFormData({
        name: "",
        mobile: "",
        email: "",
        role: "",
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

  const handleSubmit = () => {
    handleSave(formData);
    handleClose(); // Close the modal after saving
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered className="add-form-modal" >
      <Modal.Header closeButton>
        <Modal.Title>{user ? "Edit User" : "Add New User"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          <Form.Group controlId="role" className="mt-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {user ? "Save changes" : "Add User"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPopup;
