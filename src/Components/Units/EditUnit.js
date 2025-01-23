import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditUnit = ({ show, handleClose, details, onSave }) => {
  const [formData, setFormData] = useState({
    serialNo: "",
    name: "",
    shortName: "",
    baseUnit: "",
  });

  // Update formData whenever details prop changes
  useEffect(() => {
    if (details) {
      setFormData(details);
    }
  }, [details]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered  className="edit-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>Edit Unit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form  className="edit-form">
          <Form.Group className="mb-3">
            <Form.Label>Serial No</Form.Label>
            <Form.Control
              type="text"
              name="serialNo"
              value={formData.serialNo}
              onChange={handleChange}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Short Name</Form.Label>
            <Form.Control
              type="text"
              name="shortName"
              value={formData.shortName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Base Unit</Form.Label>
            <Form.Control
                          as="select"
                          name="baseUnit"
                          value={formData.baseUnit}
                          onChange={handleChange}
                          required
                        >
                          
                          <option value="Kilogram">Kilogram</option>
                          <option value="Gram">Gram</option>
                          <option value="Liter">Liter</option>
                          <option value="Meter">Meter</option>
                          <option value="Piece">Piece</option>
                        </Form.Control>
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

export default EditUnit;
