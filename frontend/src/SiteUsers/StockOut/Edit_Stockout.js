import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../ApiService/Api";

const EditStockOutModal = ({ show, handleClose, stockOutData, handleUpdate }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ ...stockOutData, dateTime: "" });
  const [sites, setSites] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setFormData({
      ...stockOutData,
      dateTime: stockOutData.date || "",
    });
  }, [stockOutData]);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/sites`);
        if (response.status === 200) {
          setSites(response.data);
        }
      } catch (error) {
        console.error("Error fetching sites:", error);
      }
    };
    
    fetchSites();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user?.id || !formData.siteName) return;
      try {
        const response = await axios.get(`${BASE_URL}/fetch-all-products?userId=${user?.id}&siteName=${formData.siteName}`);
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [user?.id, formData.siteName]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleProductChange = (e) => {
    const selectedProduct = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      productName: selectedProduct,
      units: products.find((item) => item.product === selectedProduct)?.units || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${BASE_URL}/stock-out/${formData.id}`, formData);
      alert(response.data.message);
      if (response.status === 200) {
        handleUpdate(formData);
        handleClose();
      }
    } catch (error) {
      console.error("Error updating stock record:", error);
      alert("Failed to update stock record.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header className="bg-warning text-white" closeButton>
        <Modal.Title>Edit Stock Out</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Date & Time</Form.Label>
                <Form.Control type="datetime-local" name="dateTime" value={formData.dateTime} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Destination Site</Form.Label>
                <Form.Control as="select" name="destinationSite" value={formData.destinationSite} onChange={handleChange} required>
                  <option value="">Select Destination Site</option>
                  {sites.filter(site => site.id !== formData.siteId).map((site) => (
                    <option key={site.id} value={site.siteName}>{site.siteName}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control as="select" name="productName" value={formData.productName} onChange={handleProductChange} required>
                  <option value="">Select Product</option>
                  {[...new Set(products.map((item) => item.product))].map((product, index) => (
                    <option key={index} value={product}>{product}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" placeholder="Enter quantity" name="quantity_out" value={formData.quantity_out} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Units</Form.Label>
                <Form.Control type="text" name="units" value={formData.units} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Attachment</Form.Label>
                <Form.Control type="file" name="attachment" onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="warning" type="submit" className="w-100">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditStockOutModal;
