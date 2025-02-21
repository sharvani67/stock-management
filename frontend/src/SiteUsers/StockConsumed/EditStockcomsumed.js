import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../ApiService/Api";
import { AuthContext } from "../../Context/AuthContext";

const EditStockConsumedModal = ({ show, handleClose, stockConsumedData, handleUpdate }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    dateTime: "",
    productName: "",
    quantity: "",
    units: "",
    attachment: "",
    description: "",
    userId: "",
    siteManager: "",
    siteCode: "",
    siteName: "",
    siteId: "",
  });
  const [products, setProducts] = useState([]);
  const [sites, setSites] = useState([]);

  useEffect(() => {
    if (stockConsumedData) {
      setFormData({
        dateTime: stockConsumedData.dateTime || "",
        productName: stockConsumedData.productName || "",
        quantity: stockConsumedData.quantity || "",
        units: stockConsumedData.units || "",
        attachment: stockConsumedData.attachment || "",
        description: stockConsumedData.description || "",
        userId: stockConsumedData.userId || "",
        siteManager: stockConsumedData.siteManager || "",
        siteCode: stockConsumedData.siteCode || "",
        siteName: stockConsumedData.siteName || "",
        siteId: stockConsumedData.siteId || "",
      });
    }
  }, [stockConsumedData]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user?.id || !formData.siteName) return;
      try {
        const response = await axios.get(`${BASE_URL}/fetch-all-products`, {
          params: { userId: user?.id, siteName: formData.siteName },
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
    Object.keys(formData).forEach((key) => {
      if (key !== "attachment") {
        formDataToSend.append(key, formData[key]);
      }
    });
    if (formData.attachment && formData.attachment instanceof File) {
      formDataToSend.append("attachment", formData.attachment);
    }
    try {
      const response = await axios.put(`${BASE_URL}/stock-consumed/${stockConsumedData.id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        handleUpdate({ ...stockConsumedData, ...formData, attachment: response.data.attachment });
        handleClose();
        alert("Stock consumed record updated successfully!");
      } else {
        alert("Failed to update stock consumed record.");
      }
    } catch (error) {
      console.error("Error updating stock record:", error);
      alert("An error occurred while updating.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header className="bg-warning text-white" closeButton>
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
          <Button variant="warning" type="submit" className="w-100 mt-3">Update</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditStockConsumedModal;
