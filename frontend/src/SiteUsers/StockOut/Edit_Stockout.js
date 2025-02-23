import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../ApiService/Api";

const EditStockOutModal = ({ show, handleClose, stockOutData, handleUpdate }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    ...stockOutData,
    dateTime: stockOutData.date || "",
    destinationSite: stockOutData.receiver || "", // Prefill destination site
  });
  const [sites, setSites] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (stockOutData) {
      setFormData({
        ...stockOutData,
        dateTime: stockOutData.date || "",
        destinationSite: stockOutData.receiver || "", 
        productName: stockOutData.product || "",// Ensure destination site is prefilled
      });
    }
  }, [stockOutData]);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/sites`);
        if (response.status === 200) {
          const allSites = response.data;
          setSites(allSites);
          const userSites = allSites.filter(site => site.userId === user?.id);
          if (userSites.length > 0) {
            const selectedSite = userSites[0];
            setFormData(prev => ({
              ...prev,
              userId: user?.id,
              siteManager: selectedSite.siteManager,
              siteCode: selectedSite.siteCode,
              siteName: selectedSite.siteName,
              siteId: selectedSite.id,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching sites:", error);
      }
    };

    if (user?.id) fetchSites();
  }, [user?.id]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user?.id || !formData.siteName) return;
      try {
        const response = await axios.get(`${BASE_URL}/fetch-all-products`, {
          params: { userId: user?.id, siteName: formData.siteName }
        });
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [user?.id, formData.siteName]);

  const handleProductChange = (e) => {
    const selectedProduct = e.target.value;
    const productData = products.find((item) => item.product === selectedProduct);
    setFormData((prevFormData) => ({
      ...prevFormData,
      productName: selectedProduct,
      units: productData?.units || "",
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
    formDataToSend.append("date", formData.dateTime);
    formDataToSend.append("destinationSite", formData.destinationSite);
    formDataToSend.append("productName", formData.productName);
    formDataToSend.append("quantity_out", formData.quantity_out);
    formDataToSend.append("units", formData.units);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("id", formData.id);
  
    // Append the file only if a new one is selected
    if (formData.attachment instanceof File) {
      formDataToSend.append("attachment", formData.attachment);
    }
  
    try {
      const response = await axios.put(`${BASE_URL}/stock-out/${formData.id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 200) {
        handleUpdate(response.data); // Update parent component
        handleClose(); // Close modal
        alert(response.data.message || "Stock-Out updated successfully");
      } else {
        alert(response.data.message || "Failed to update stock-out");
      }
    } catch (error) {
      console.error("Error updating stock:", error.response?.data || error.message);
      alert("Failed to update stock.");
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
              <Form.Group controlId="formDateTime">
                <Form.Label>Date & Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="dateTime"
                  value={formData.dateTime}
                  onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formDestinationSite">
                <Form.Label>Destination Site</Form.Label>
                <Form.Control
                  as="select"
                  name="destinationSite"
                  value={formData.destinationSite}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Destination Site</option>
                  {sites.filter(site => site.id !== formData.siteId).map((site) => (
                    <option key={site.id} value={site.siteName}>
                      {site.siteName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
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
            <Col md={6}>
              <Form.Group controlId="formQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter quantity"
                  name="quantity_out"
                  value={formData.quantity_out}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formUnits">
                <Form.Label>Units</Form.Label>
                <Form.Control type="text" name="units" value={formData.units} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formAttachment">
                <Form.Label>Attachment</Form.Label>
                <Form.Control
                  type="file"
                  name="attachment"
                  onChange={handleChange}
                />
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

          <Button variant="warning" type="submit" className="w-100">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditStockOutModal;
