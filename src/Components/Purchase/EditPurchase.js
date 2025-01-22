import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';

const EditPurchaseForm = ({ initialData }) => {
  const { sNo } = useParams(); // Extract sNo from the route
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Set initial form data based on provided props or state
    const data = initialData.find((item) => item.sNo === parseInt(sNo));
    if (data) {
      setFormData(data);
    } else {
      console.error(`No data found for S.No ${sNo}`);
    }
  }, [sNo, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Purchase Data:', formData);
    navigate('/purchase'); // Navigate back to the purchase management table
  };

  const handleCancel = () => {
    navigate('/purchase'); // Navigate back to the purchase management table
  };

  if (!formData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Edit Purchase</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="stockName" className="mb-3">
                  <Form.Label>Stock Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="stockName"
                    value={formData.stockName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="quantity" className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="units" className="mb-3">
                  <Form.Label>Units</Form.Label>
                  <Form.Control
                    type="text"
                    name="units"
                    value={formData.units}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="price" className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="supplierName" className="mb-3">
                  <Form.Label>Supplier Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="supplierName"
                    value={formData.supplierName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="brandName" className="mb-3">
                  <Form.Label>Brand Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end mt-4">
              <Button variant="secondary" className="me-2" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Update Purchase
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditPurchaseForm;
