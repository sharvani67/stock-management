import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { BASE_URL } from "../../ApiService/Api";

const AddSupplierModal = ({ show, handleClose, handleSave }) => {
  const [supplierName, setSupplierName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const saveSupplier = (supplierData) => {
    fetch(`${BASE_URL}/api/suppliers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplierData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message); // Notify success
        } else {
          alert("Error adding supplier");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = () => {
    if (supplierName && contact && address && email) {
      saveSupplier({ supplierName, contact, address, email });
      handleClose(); // Close the modal after saving
      window.location.reload();
    } else {
      alert("Please fill all fields.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="add-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add New Supplier</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="supplierName">
            <Form.Label>Supplier Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter supplier name"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="contact" className="mt-3">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter contact number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="address" className="mt-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSupplierModal;
