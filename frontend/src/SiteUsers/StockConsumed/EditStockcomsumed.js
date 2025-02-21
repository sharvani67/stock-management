import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../ApiService/Api";

const StockConsumedEditForm = ({ show, handleClose, stockData, handleUpdate }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState(stockData);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setFormData(stockData);
  }, [stockData]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user?.id || !formData.siteName) return;
      try {
        const response = await fetch(`${BASE_URL}/fetch-all-products?userId=${user?.id}&siteName=${formData.siteName}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [user?.id, formData.siteName]);

  const handleProductChange = (e) => {
    const selectedProduct = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      productName: selectedProduct,
      units: products.find((item) => item.product === selectedProduct)?.units || "",
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "attachment") {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (formData.attachment && formData.attachment instanceof File) {
      formDataToSend.append("attachment", formData.attachment);
    }

    try {
      const response = await axios.put(`${BASE_URL}/stock-consumed/${formData.id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      if (response.status === 200) {
        alert("Stock record updated successfully!");
        handleUpdate({ ...formData, attachment: response.data.attachment });
        handleClose();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update stock.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Stock Consumed</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formDateTime">
                <Form.Label>Date & Time</Form.Label>
                <Form.Control type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control as="select" name="productName" value={formData.productName} onChange={handleProductChange} required>
                  <option value="">Select Product</option>
                  {[...new Set(products.map((item) => item.product))].map((product, index) => (
                    <option key={index} value={product}>{product}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formUnits">
                <Form.Label>Units</Form.Label>
                <Form.Control type="text" name="units" value={formData.units} readOnly />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="formAttachment">
                <Form.Label>Attachment</Form.Label>
                <Form.Control type="file" name="attachment" onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default StockConsumedEditForm;
