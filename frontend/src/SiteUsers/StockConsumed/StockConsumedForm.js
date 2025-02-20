import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../ApiService/Api";

const StockConsumedForm = ({ show, handleClose, handleSave }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    productName: "",
    
    quantity: "",
    units: "",
    attachment:"",
    description: "",
    dateTime: "",
    userId: "",
    siteManager: "",
    siteCode: "",
    siteName: "",
    siteId: "",
  });

  const [products, setProducts] = useState([]);
  const [sites, setSites] = useState([]);

  // Fetch Sites for the Logged-in User
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch(`${BASE_URL}/sites?userId=${user?.id}`);
        if (response.ok) {
          const data = await response.json();
          const userSites = data.filter((site) => site.userId === user?.id);

          if (userSites.length > 0) {
            const selectedSite = userSites[0];
            setFormData((prevFormData) => ({
              ...prevFormData,
              userId: user?.id,
              siteManager: selectedSite.siteManager,
              siteCode: selectedSite.siteCode,
              siteName: selectedSite.siteName,
              siteId: selectedSite.id,
            }));
            setSites(userSites);
          } else {
            console.error("No sites found for the user");
          }
        } else {
          console.error("Failed to fetch sites");
        }
      } catch (error) {
        console.error("Error fetching sites:", error);
      }
    };

    if (user?.id) {
      fetchSites();
    }
  }, [user?.id]);


  // Format datetime
  useEffect(() => {
    const formatDateTime = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    setFormData((prevFormData) => ({
      ...prevFormData,
      dateTime: formatDateTime(new Date()),
    }));
  }, []);

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${BASE_URL}/stock-consumed`, formData);
        alert(response.data.message);

        if (response.status === 200) {
            handleSave(formData); // Pass the new data to the parent component
            handleClose(); // Close the modal after saving
            window.location.reload(); // Refresh the page after closing the modal
        }
    } catch (error) {
        console.error("Error adding stock:", error);
        alert("Failed to add stock.");
    }
};


  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header className="bg-primary text-white" closeButton>
        <Modal.Title>Stock Consumed Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">

          <Col md={6}>
              <Form.Group controlId="formDateTime">
                <Form.Label>Date & Time</Form.Label>
                <Form.Control type="datetime-local" name="dateTime" value={formData.dateTime} onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control as="select" name="productName" value={formData.productName} onChange={(e) => handleProductChange(e)} required>
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
                <Form.Control type="number" placeholder="Enter quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
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
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default StockConsumedForm;