import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddBrand = ({ onAddBrand }) => {
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAddBrand = (e) => {
    e.preventDefault();
    if (brandName && description) {
      onAddBrand({ name: brandName, description });
      setBrandName("");
      setDescription("");
      setShowModal(false); // Close modal after adding the brand
    }
  };

  return (
    <>
      <Button variant="success" onClick={() => setShowModal(true)} className="mb-3">
        Add Brand
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddBrand}>
            <Form.Group controlId="brandName">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="description" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Add Brand
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddBrand;
